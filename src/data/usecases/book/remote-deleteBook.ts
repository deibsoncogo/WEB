import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteBook implements IDeleteBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  deleteBook = async () => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'delete',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Livro não encontrado'])
      default:
        throw new UnexpectedError()
    }
  }
}
