import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllTeacherCourses } from '../../../domain/usecases/interfaces/course/getAllTeacherCourses'
import { GetRoomParams } from '../../../domain/usecases/interfaces/room/getAllTeacherRooms'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialCourseResponse } from '../../../interfaces/api-response/coursePartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllTeacherCourses implements IGetAllTeacherCourses {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IPartialCourseResponse>>
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
