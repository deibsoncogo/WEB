import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IUpdateBook, UpdateBookParams } from '../../../domain/usecases/interfaces/book/getBooks'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteUpdateBook implements IUpdateBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  update = async (params: UpdateBookParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params.data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(['Livro já cadastrado.'])
      default:
        throw new UnexpectedError()
    }
  }
}
