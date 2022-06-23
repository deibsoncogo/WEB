import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetBookParams, IGetBooks } from '../../../domain/usecases/interfaces/book/getBooks'
import { IBookResponse } from '../../../interfaces/api-response/bookResponse'

import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetBooks implements IGetBooks {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IBookResponse[]>
  ) {}

  get = async (params: GetBookParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
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
