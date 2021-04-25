import * as Hapi from '@hapi/hapi'
import WorkerRoutes from './api/worker/routes'
import Logger from './plugins/logger.plugin'

export default class Router {
  public static async loadRoutes (server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes')

    await new WorkerRoutes().register(server)

    Logger.info('Router - Finish adding routes')
  }
}
