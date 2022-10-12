import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { INotification } from '../../../domain/models/notification'
import { IJoinNotification } from '../../../domain/usecases/interfaces/notification/join-notification'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteJoinNotification implements IJoinNotification {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<INotification[]>
  ) {}

  join = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body.accessToken
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
