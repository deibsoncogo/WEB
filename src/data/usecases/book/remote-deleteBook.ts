import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'

import { IBookResponse } from '../../../interfaces/api-response/bookResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteBook implements IDeleteBook {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IBookResponse[]>
  ) {}

  async deleteBook() {
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
