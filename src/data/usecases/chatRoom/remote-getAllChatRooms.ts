import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IChatRoom } from '../../../domain/models/createChatRoom'
import {
  IGetChatAllRoomParam,
  IGetAllChatRooms,
} from '../../../domain/usecases/interfaces/chatRoom/getAllChatRooms'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllChatRooms implements IGetAllChatRooms {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<IChatRoom[]>) {}

  getAll = async (query: IGetChatAllRoomParam) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query,
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
