import xml2js from 'xml2js'
import { Product } from '../../models/product.model'
import * as _ from 'lodash'

export default class WorkerParser {
  xmlToJson (xml: XMLDocument): any {
    let json
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        throw err
      }
      json = JSON.stringify(result, null, 4)
    })

    return this.formatProductsFromXml(JSON.parse(json))
  }

  formatProductsFromXml (response: any): Product[] {
    const products: Product[] = []
    response.artikelen.artikel.forEach((prod: any) => {
      products.push({
        id: Number(prod.aid[0]),
        name: prod.omschrijving[0],
        sku: prod.artikelnr[0],
        price: prod.prijs[0] ? parseFloat(prod.prijs[0].replace(',', '.')) : 0,
        inventoryLevel: Number(prod.voorraad_fysiek[0]),
        images: _.map(prod.photos[0].photo, '_')
      })
    })

    return this.removeDuplicates(products)
  }

  formatProductFromCommerce (response: any): Product {
    let products: Product
    if (response.data.length) {
      products = {
        id: response.data[0].id,
        name: response.data[0].name,
        sku: response.data[0].sku,
        price: response.data[0].price,
        inventoryLevel: response.data[0].inventory_level,
        images: response.data[0].images
      }
    }

    return products
  }

  removeDuplicates (products: Product[]): Product[] {
    const filter = _.uniqWith(
      products,
      (prodA, prodB) =>
        prodA.sku === prodB.sku ||
        prodA.name === prodB.name
    )

    return filter
  }
}
