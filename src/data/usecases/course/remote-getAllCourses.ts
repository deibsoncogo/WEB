import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialCourseResponse} from '../../../interfaces/api-response/courseResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllCourses implements IGetAllCourses {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IPartialCourseResponse>>
  ) {}

  async getAll() {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
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
