import { HttpClient, HttpStatusCode } from './../../protocols/http-client';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';
import { IDeleteRoom } from '../../../domain/usecases/interfaces/room/deleteRoom';

export class RemoteDeleteRoom implements IDeleteRoom {
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
        throw new InvalidParamsError(["Sala não encontrada."])
      default:
        throw new UnexpectedError()
    }
  }
}
