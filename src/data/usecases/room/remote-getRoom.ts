import { IRoomResponse } from './../../../interfaces/api-response/roomResponse';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetRoom } from '../../../domain/usecases/interfaces/room/getCourse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetRoom implements IGetRoom {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IRoomResponse>
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
