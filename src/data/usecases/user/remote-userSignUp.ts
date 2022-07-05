import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError } from '../../../domain/errors'
import { IUserSignUp } from '../../../domain/usecases/interfaces/user/userSignUp'
import { UserSignUp } from '../../../domain/models/userSignUp'

export class RemoteUserSignUp implements IUserSignUp {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  async signUp(userSignUp: UserSignUp) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: userSignUp,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return true
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
