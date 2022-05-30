import { HttpClient, HttpStatusCode } from './../../protocols/http-client';
import { IDeleteCourse } from "../../../domain/usecases/interfaces/course/deleteCourse"
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';

export class RemoteDeleteCourse implements IDeleteCourse {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<string>
  ) {}

  async delete(id: string) {
    const httpResponse = await this.httpClient.request({
      url:  `${this.url}/${id}`,
      method: 'delete',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(["Curso não encontrado."])
      default:
        throw new UnexpectedError()
    }
  }
}
