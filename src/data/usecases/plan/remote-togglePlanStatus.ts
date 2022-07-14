import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  ITogglePlanStatus,
  ITogglePlanStatusParams,
} from '../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteTogglePlanStatus implements ITogglePlanStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: ITogglePlanStatusParams) => {
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
