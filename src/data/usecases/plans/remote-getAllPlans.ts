import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetPlansParams, IGetAllPlans } from '../../../domain/usecases/interfaces/plans/getAllPlans'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialPlansResponse } from '../../../interfaces/api-response/plansPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllPlans implements IGetAllPlans {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IPartialPlansResponse>>
  ) {}

  async getAll(query: GetPlansParams) {    
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query
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
