import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IEditTraining } from '../../../domain/usecases/interfaces/trainings/editTraining'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteEditTraining implements IEditTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  edit = async (data: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
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
