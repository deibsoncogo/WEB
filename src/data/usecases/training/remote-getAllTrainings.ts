import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllTrainings implements IGetAllTrainings {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ITrainingsResponse[]>
  ) {}

  async getAll(params: any) {
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
