import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols'
import {
  AccessDeniedError,
  InvalidCredentialsError,
  InvalidParamsError,
} from '../../../domain/errors'
import { IUserSignIn } from '../../../domain/usecases/interfaces/user/userSignIn'
import { UserSignIn } from '../../../domain/models/userSignIn'
import { IAuthResponse } from '../../../interfaces/api-response/authResponse'

export class RemoteUserSignIn implements IUserSignIn {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IAuthResponse>
  ) {}

  async signIn(userSignIn: UserSignIn) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: userSignIn,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidCredentialsError('E-mail e/ou senha inválidos.')
      case HttpStatusCode.unauthorized:
        throw new AccessDeniedError('Acesso negado! Você não tem permissão para acessar o sistema.')
      default:
        throw new UnexpectedError()
    }
  }
}
