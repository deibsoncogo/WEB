import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IPlan } from '../../../domain/models/plan'
import { IGetNotRelatedPlans } from '../../../domain/usecases/interfaces/plan/getNotRelatedPlans'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetNotRelatedPlans implements IGetNotRelatedPlans {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IPlan[]>
  ) {}

  async get() {    
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
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
