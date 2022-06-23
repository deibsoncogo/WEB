import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IPlan } from '../../../domain/models/plan'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import { GetCategoriesParams } from '../../../domain/usecases/interfaces/category/getCategories'
import { IGetPlans } from '../../../domain/usecases/interfaces/plan/getPlans'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetPlanss implements IGetPlans {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<IPlan>>
  ) {}

  get = async (params: GetCategoriesParams) => {
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
