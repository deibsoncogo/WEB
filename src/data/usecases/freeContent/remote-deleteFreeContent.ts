import { HttpClient, HttpStatusCode } from './../../protocols/http-client';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';
import { IDeleteFreeContent } from '../../../domain/usecases/interfaces/freeContent/deleteFreeContent';

export class RemoteDeleteFreeContent implements IDeleteFreeContent {
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
