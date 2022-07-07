import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IToggleRoomStatus,
  IToggleRoomStatusParams,
} from '../../../domain/usecases/interfaces/room/toggleRoomStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleRoomStatus implements IToggleRoomStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleRoomStatusParams) => {
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
