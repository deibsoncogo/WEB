import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { getAuthHeadersMultipart } from '../../../helpers/axios/axiosHeaderMultipart'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteUpdateTraining implements IUpdateTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<boolean>) {}

  update = async (updateTraining: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: updateTraining,
      headers: getAuthHeadersMultipart(),
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return true
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
