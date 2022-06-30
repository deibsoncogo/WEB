import { ICourseResponse } from './../../../interfaces/api-response/courseResponse';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { IGetCourse } from '../../../domain/usecases/interfaces/course/getCourse'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IPartialCourseResponse} from '../../../interfaces/api-response/coursePartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetCourse implements IGetCourse {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ICourseResponse>
  ) {}

  async get(id: string) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
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
