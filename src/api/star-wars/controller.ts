import * as Hapi from '@hapi/hapi'
import StarWarsService from '../../services/star-wars.service'
import newResponse from '../../helper/response'
import Boom from '@hapi/boom'

export default class StarWarsController {
  private readonly serviceStarWars: StarWarsService = new StarWarsService()

  public getPeople = async (
    request: Hapi.RequestToolkit, toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const { data } = await this.serviceStarWars.readPeople(request.params.id)
      return toolkit.response(
        newResponse(request, { value: data })
      )
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw Boom.notFound('Nenhum registro encontrado')
      }
      throw Boom.boomify(error, { statusCode: 500 })
    }
  }

  public getStarShip = async (
    request: Hapi.RequestToolkit, toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const { data } = await this.serviceStarWars.readStarships(request.params.id)

      return toolkit.response(
        newResponse(request, { value: data })
      )
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw Boom.notFound('Nenhum registro encontrado')
      }
      throw Boom.boomify(error, { statusCode: 500 })
    }
  }

  public getPlanet = async (
    request: Hapi.RequestToolkit, toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const { data } = await this.serviceStarWars.readPlanets(request.params.id)

      return toolkit.response(
        newResponse(request, { value: data })
      )
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw Boom.notFound('Nenhum registro encontrado')
      }
      throw Boom.boomify(error, { statusCode: 500 })
    }
  }
}
