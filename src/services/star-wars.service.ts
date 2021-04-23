import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.starwars

export default class StarWarsService {
  message: string
  code: number

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url,
    retry,
    delay
  )

  async readPeople (id: number): Promise<any> {
    return await this.axios.request({
      method: 'GET',
      url: `people/${id}/`
    })
  }

  async readStarships (id: number): Promise<any> {
    return await this.axios.request({
      method: 'GET',
      url: `starships/${id}/`
    })
  }

  async readPlanets (id: number): Promise<any> {
    return await this.axios.request({
      method: 'GET',
      url: `planets/${id}/`
    })
  }
}
