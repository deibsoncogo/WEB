import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError } from '../../../domain/errors'

export class RemoteUserVerifyEmail implements IUserVerifyEmail {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  async verifyUserEmail(email: string) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${email}`,
      method: 'get',
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        if (Array.isArray(httpResponse.body?.message))
          throw new InvalidParamsError(httpResponse.body?.message)
        throw new InvalidParamsError([httpResponse.body?.message])
      default:
        throw new UnexpectedError()
    }
  }
}
