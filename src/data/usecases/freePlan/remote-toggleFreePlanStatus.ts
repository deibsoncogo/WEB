import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IToggleFreePlanStatus,
  IToggleFreePlanStatusParams,
} from '../../../domain/usecases/interfaces/freePlan/toggleFreePlanStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleFreePlanStatus implements IToggleFreePlanStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleFreePlanStatusParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
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
