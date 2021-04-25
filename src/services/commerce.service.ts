import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, token, retry, delay } = Config.apis.commerce

export default class CommerceService {
  message: string
  code: number

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url,
    retry,
    delay
  )

  async readProduct (sku: string): Promise<any> {
    return await this.axios.request({
      method: 'GET',
      url: `?include=images&sku=${sku}`,
      headers: {
        'x-auth-token': token
      }
    })
  }

  async updateProduct (id: number, payload: any): Promise<any> {
    return await this.axios.request({
      method: 'PUT',
      url: `/${id}`,
      headers: {
        'x-auth-token': token
      },
      data: payload
    })
  }

  async createProduct (payload: any): Promise<any> {
    return await this.axios.request({
      method: 'POST',
      headers: {
        'x-auth-token': token
      },
      data: payload
    })
  }

  async createProductImages (id: number, payload: any): Promise<any> {
    return await this.axios.request({
      method: 'POST',
      url: `/${id}/images`,
      headers: {
        'x-auth-token': token
      },
      data: payload
    })
  }
}
