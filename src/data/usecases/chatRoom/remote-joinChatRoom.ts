import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IChatRoom } from '../../../domain/models/createChatRoom'
import {
  IJoinChatRoom,
  IJoinChatRoomParams,
} from '../../../domain/usecases/interfaces/chatRoom/joinChatRoom'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteJoinChatRoom implements IJoinChatRoom {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IChatRoom[]>) {}

  join = async (query: IJoinChatRoomParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${query.roomId}`,
      method: 'post',
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
