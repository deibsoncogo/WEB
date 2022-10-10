import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IDeleteFreePlan,
  IDeleteFreePlanParams,
} from '../../../domain/usecases/interfaces/freePlan/deleteFreePlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteFreePlan implements IDeleteFreePlan {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  delete = async (params: IDeleteFreePlanParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete',
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
