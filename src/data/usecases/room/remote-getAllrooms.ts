import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IRoom } from '../../../domain/models/room'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import { GetRoomParams, IGetAllRooms } from '../../../domain/usecases/interfaces/room/getAllRooms'
import { IRoomPartialResponse } from '../../../interfaces/api-response/roomPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllRooms implements IGetAllRooms {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<IRoom>>
  ) {}

  async getAll(query: GetRoomParams) {
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
