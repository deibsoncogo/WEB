import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ICreateBook } from '../../../domain/usecases/interfaces/book/createBook'
import { getAuthHeadersMultipart } from '../../../helpers/axios/axiosHeaderMultipart'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreateBook implements ICreateBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

  async create(bookData: FormData) {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: bookData,
      headers: getAuthHeadersMultipart(),
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
