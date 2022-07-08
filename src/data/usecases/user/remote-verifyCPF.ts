import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import { HttpClient, HttpStatusCode } from '../../protocols'
import { InvalidParamsError } from '../../../domain/errors'

export class RemoteUserVerifyCPF implements IUserVerifyCPF {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

  async verifyUserCPF(cpf: string) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${cpf}`,
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
