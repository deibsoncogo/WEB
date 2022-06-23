import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';
import { ICourseClassResponse } from '../../../interfaces/api-response/courseClassResponse';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { IGetAllCourseClassByCourseId } from './../../../domain/usecases/interfaces/courseClass/getAllCourseClassByCourseId';


export class RemoteGetAllCourseClassByCourseId implements IGetAllCourseClassByCourseId{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ICourseClassResponse[]>
  ) {}

  async getAllByCourseId(courseId: string) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${courseId}`,
      method: 'get'     
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
