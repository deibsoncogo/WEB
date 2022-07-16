import { IDeleteNotification } from './../../../domain/usecases/interfaces/notification/deleteNotification';
import { HttpClient, HttpStatusCode } from '../../protocols/http-client';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';

export class RemoteDeleteNotification implements IDeleteNotification {
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
        throw new InvalidParamsError(["Conteúdo não encontrado."])
      default:
        throw new UnexpectedError()
    }
  }
}
