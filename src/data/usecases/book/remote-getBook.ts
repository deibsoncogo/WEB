import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetBook, IGetBookParams } from '../../../domain/usecases/interfaces/book/getBook'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetBook implements IGetBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  get = async (params: IGetBookParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
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
