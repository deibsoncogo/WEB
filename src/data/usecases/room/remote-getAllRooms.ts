import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetRoomParams, IGetAllRooms } from '../../../domain/usecases/interfaces/room/getAllRooms'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialCourseResponse} from '../../../interfaces/api-response/coursePartialResponse'
import { IRoomPartialResponse } from '../../../interfaces/api-response/roomPartialResponse'
import { IRoomResponse } from '../../../interfaces/api-response/roomResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllrooms implements IGetAllRooms {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IRoomPartialResponse>>
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
