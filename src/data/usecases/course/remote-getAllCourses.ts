import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllCourses } from '../../../domain/usecases/interfaces/course/getAllCourses'
import { ICourseResponse } from '../../../interfaces/api-response/courseResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllCourses implements IGetAllCourses {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<any>
  ) {}

  async getAll() {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })
    console.log(httpResponse)
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
