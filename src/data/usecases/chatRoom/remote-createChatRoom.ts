import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IChatRoom } from '../../../domain/models/createChatRoom'
import { ICreateChatRoom } from '../../../domain/usecases/interfaces/chatRoom/createRoom'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreateChatRoom implements ICreateChatRoom {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

  async create(chatRoom: IChatRoom) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: chatRoom,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return true
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
