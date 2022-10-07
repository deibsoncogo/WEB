import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllFreePlans } from '../../../domain/usecases/interfaces/freePlan/getAllFreePlans'
import { GetPlansParams } from '../../../domain/usecases/interfaces/plans/getAllPlans'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialPlansResponse } from '../../../interfaces/api-response/plansPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllFreePlans implements IGetAllFreePlans {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IPartialPlansResponse>>
  ) {}

  async getAll(query: GetPlansParams) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query,
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
