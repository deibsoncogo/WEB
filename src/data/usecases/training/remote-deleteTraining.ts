import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeleteTraining implements IDeleteTraining {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ITrainingsResponse[]>
  ) {}

  async deleteTraining() {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'delete',
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
