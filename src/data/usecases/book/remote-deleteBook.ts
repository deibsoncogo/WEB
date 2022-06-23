import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IDeleteBook, IDeleteBookParams } from '../../../domain/usecases/interfaces/book/deleteBook'

import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteBook implements IDeleteBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  delete = async (params: IDeleteBookParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'delete',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Livro não encontrada'])
      default:
        throw new UnexpectedError()
    }
  }
}
