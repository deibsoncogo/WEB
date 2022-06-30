import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IEditBook } from '../../../domain/usecases/interfaces/book/editBook'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteEditBook implements IEditBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  edit = async (data: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
