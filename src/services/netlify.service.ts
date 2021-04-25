import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.netlify

export default class NetlifyService {
  message: string
  code: number

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url,
    retry,
    delay
  )

  async readXML (): Promise<any> {
    return await this.axios.request({
      method: 'GET'
    })
  }
}
