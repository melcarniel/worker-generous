import * as Hapi from '@hapi/hapi'
import WorkerBusiness from './business'
import newResponse from '../../helper/response'
import Boom from '@hapi/boom'

export default class WorkerRoutesController {
  private readonly businessWorker: WorkerBusiness = new WorkerBusiness()

  public syncProducts = async (
    request: Hapi.Request, toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const data = await this.businessWorker.syncProducts()
      return toolkit.response(
        newResponse(request, { value: data })
      )
    } catch (error) {
      throw Boom.boomify(error, { statusCode: 500 })
    }
  }
}
