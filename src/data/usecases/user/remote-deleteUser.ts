import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteUser implements IDeleteUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  async deleteUser() {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'delete',
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
