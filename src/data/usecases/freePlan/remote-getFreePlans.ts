import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IFreePlan } from '../../../domain/models/freePlan'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import { IGetFreePlans } from '../../../domain/usecases/interfaces/freePlan/getFreePlans'
import { IGetPlansParams } from '../../../domain/usecases/interfaces/plan/getPlans'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetFreePlans implements IGetFreePlans {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<IFreePlan>>
  ) {}

  get = async (params: IGetPlansParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
