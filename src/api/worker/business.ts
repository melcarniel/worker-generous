import CommerceService from '../../services/commerce.service'
import NetlifyService from '../../services/netlify.service'
import WorkerParser from './parser'
import Logger from '../../plugins/logger.plugin'
import { Product } from '../../models/product.model'

export default class WorkerBusiness {
  private readonly serviceNetlify: NetlifyService = new NetlifyService()
  private readonly serviceCommerce: CommerceService = new CommerceService()
  private readonly parserWorker: WorkerParser = new WorkerParser()

  async syncProducts (): Promise<any> {
    const promises: Array<Promise<any>> = []
    const createdProducts: any = []
    const updatedProducts: any = []
    const errors: any = []

    const { data } = await this.serviceNetlify.readXML()
    const parserData = this.parserWorker.xmlToJson(data)

    for (const product of parserData) {
      promises.push(this.getDataCommerce(product.sku).then(async (dataCommerce: any) => {
        if (dataCommerce) {
          await this.checkUpdateProducts(dataCommerce, product, updatedProducts)
        } else {
          await this.postProduct(product, createdProducts)
        }
      }).catch((error: any) => {
        Logger.info('Erro syncProducts: ', error)
      }))
    }
    await Promise.all(promises)

    return { created: createdProducts, updated: updatedProducts, errors }
  }

  async checkUpdateProducts (dataCommerce, product, updatedProducts): Promise<any> {
    if (dataCommerce.price === product.price && dataCommerce.inventoryLevel === product.inventoryLevel) {
      Logger.info(`Product ${dataCommerce.id} has not changed`)
    } else {
      const payload = {
        price: product.price,
        inventory_level: product.inventoryLevel
      }
      await this.updateProduct(dataCommerce.id, payload)
      updatedProducts.push({
        id: dataCommerce.id
      })
    }
  }

  async postProduct (product: Product, createdProducts): Promise<any> {
    const promisesImages: Array<Promise<any>> = []

    const payloadProduct = {
      name: product.name,
      sku: product.sku,
      type: 'physical',
      categories: [
        23
      ],
      price: product.price,
      weight: 1,
      inventory_level: product.inventoryLevel
    }
    promisesImages.push(this.createProduct(product.sku, payloadProduct).then(async (newProduct: any) => {
      createdProducts.push(newProduct.data)
      if (newProduct.data.id && product.images.length) {
        await this.postImage(product, newProduct)
      }
    }).catch((error: any) => {
      Logger.info('Erro postProduct: ', error)
    }))

    await Promise.all(promisesImages)
  }

  async postImage (product, newProduct): Promise<any> {
    const promisesImages: Array<Promise<any>> = []

    for (const [index, item] of product.images.entries()) {
      promisesImages.push(this.createProductImage(newProduct.data.id, {
        is_thumbnail: true,
        sort_order: index + 1,
        image_url: item
      }).catch((error: any) => {
        Logger.info('Erro postImage: ', error)
      }))
    }

    await Promise.all(promisesImages)
  }

  async getDataCommerce (sku: string): Promise<any> {
    try {
      const { data } = await this.serviceCommerce.readProduct(sku)
      return this.parserWorker.formatProductFromCommerce(data)
    } catch (error) {
      return undefined
    }
  }

  async updateProduct (id: number, payload: any): Promise<any> {
    try {
      await this.serviceCommerce.updateProduct(id, payload)
      Logger.info(`Product ${id} has been updated`)
    } catch (error) {
      Logger.info(`Product ${id} - tried to update but an error occurred`)
    }
  }

  async createProduct (sku: string, payloadProduct: any): Promise<any> {
    try {
      const { data } = await this.serviceCommerce.createProduct(payloadProduct)
      Logger.info(`Product sku: ${sku} has been created`)
      return data
    } catch (error) {
      Logger.info(`Product sku: ${sku} tried to create but an error occurred`)
    }
  }

  async createProductImage (id: number, payloadImage: any): Promise<any> {
    try {
      await this.serviceCommerce.createProductImages(id, payloadImage)
      Logger.info(`Product ${id} image - has been created`)
    } catch (error) {
      Logger.info(`Product ${id} image - tried to create but an error occurred`)
    }
  }
}
