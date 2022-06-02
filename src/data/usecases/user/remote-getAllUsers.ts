import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllUsers implements IGetAllUsers {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  async getAll() {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body.data
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
