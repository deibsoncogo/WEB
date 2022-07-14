import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IPlan } from '../../../domain/models/plan'
import { IGetPlan, IGetPlanParams } from '../../../domain/usecases/interfaces/plan/getPlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetPlan implements IGetPlan {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IPlan>) {}

  get = async (params: IGetPlanParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'get',
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
