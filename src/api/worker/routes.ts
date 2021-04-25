import * as Hapi from '@hapi/hapi'
import WorkerController from './controller'
import Logger from '../../plugins/logger.plugin'
import IRoute from '../../helper/route'

export default class WorkerRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('WorkerRoutes - Start adding user routes')

      const controller = new WorkerController()

      server.route([
        {
          method: 'GET',
          path: '/api/worker/data',
          options: {
            handler: controller.syncProducts,
            description: 'Method that sync products',
            tags: ['api', 'worker'],
            auth: 'jwt'
          }
        }
      ])

      Logger.info('WorkerRoutes - Finish adding worker routes')
      resolve()
    })
  }
}
