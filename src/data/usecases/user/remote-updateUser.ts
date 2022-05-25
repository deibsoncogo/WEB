import { HttpClient, HttpStatusCode } from '../../protocols'
import { UserSignUp } from '../../../domain/models/userSignUp'
import { IUserResponse } from '../../../interfaces/api-response'
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IUpdateUser } from '../../../domain/usecases/interfaces/user/updateUser'

export class RemoteUpdateUser implements IUpdateUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  async updateUser(userSignUp: UserSignUp) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: userSignUp,
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
