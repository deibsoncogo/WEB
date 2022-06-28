import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { getAuthHeadersMultipart } from '../../../helpers/axios/axiosHeaderMultipart'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteUpdateBook implements IUpdateBook {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<string>) {}

  update = async (updateBook: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: updateBook,
      headers: getAuthHeadersMultipart(),
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
