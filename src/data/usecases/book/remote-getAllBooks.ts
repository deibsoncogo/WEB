import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IBook } from '../../../domain/models/book'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  IGetAllBooks,
  IGetAllBooksParams,
} from '../../../domain/usecases/interfaces/books/getAllBooks'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllBooks implements IGetAllBooks {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<IBook>>
  ) {}

  getAll = async (params: IGetAllBooksParams) => {
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
