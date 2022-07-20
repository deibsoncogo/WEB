import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IToggleNotificationStatus, IToggleNotificationStatusParams } from '../../../domain/usecases/interfaces/notification/toggleNotificationStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleNotificationStatus implements IToggleNotificationStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleNotificationStatusParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
      body: params,
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
