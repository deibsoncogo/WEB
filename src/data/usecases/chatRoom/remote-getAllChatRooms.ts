import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetChatRoomParam, IGetAllChatRooms } from '../../../domain/usecases/interfaces/chatRoom/getAllChatRooms'
import { IChatRoom } from '../../../interfaces/api-response/chatRoomResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllChatRooms implements IGetAllChatRooms {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IChatRoom[]>
  ) {}

  async getAll(query: GetChatRoomParam) {    
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query
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
