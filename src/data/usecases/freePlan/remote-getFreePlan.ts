import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IPlan } from '../../../domain/models/plan'
import {
  IGetFreePlan,
  IGetFreePlanParams,
} from '../../../domain/usecases/interfaces/freePlan/getFreePlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetFreePlan implements IGetFreePlan {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IPlan>) {}

  get = async (params: IGetFreePlanParams) => {
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
