import * as Hapi from '@hapi/hapi'
import StarWarsController from './controller'
import validate from './validate'
import Logger from '../../plugins/logger.plugin'
import IRoute from '../../helper/route'

export default class StarWarsRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('StarWarRoutes - Start adding user routes')

      const controller = new StarWarsController()

      server.route([
        {
          method: 'GET',
          path: '/api/star-wars/people/{id}',
          options: {
            handler: controller.getPeople,
            validate: validate.getById,
            description: 'Method that get a user by its id.',
            tags: ['api', 'users'],
            auth: 'jwt'
          }
        },
        {
          method: 'GET',
          path: '/api/star-wars/starship/{id}',
          options: {
            handler: controller.getStarShip,
            validate: validate.getById,
            description: 'Method that gets all users.',
            tags: ['api', 'users'],
            auth: 'jwt'
          }
        },
        {
          method: 'GET',
          path: '/api/star-wars/planet/{id}',
          options: {
            handler: controller.getPlanet,
            validate: validate.getById,
            description: 'Method that gets all users.',
            tags: ['api', 'users'],
            auth: 'jwt'
          }
        }
      ])

      Logger.info('StarWarRoutes - Finish adding user routes')
      resolve()
    })
  }
}
