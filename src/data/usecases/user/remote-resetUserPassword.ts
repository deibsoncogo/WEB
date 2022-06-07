import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IResetUserPassword } from '../../../domain/usecases/interfaces/user/resetUserPassword'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteResetUserPassword implements IResetUserPassword {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  resetPassword = async (params: IResetUserPassword) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
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
