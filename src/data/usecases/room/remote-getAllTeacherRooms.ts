import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetRoomParams, IGetAllTeacherRooms } from '../../../domain/usecases/interfaces/room/getAllTeacherRooms'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IRoomPartialResponse } from '../../../interfaces/api-response/roomPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllTeacherRooms implements IGetAllTeacherRooms {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IRoomPartialResponse>>
  ) {}

  getAll = async (params: GetRoomParams, userId: string) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/teacher/${userId}`,
      method: 'get',
      params,
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
