import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ICreatePlan } from '../../../domain/usecases/interfaces/plan/createPlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreatePlan implements ICreatePlan {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  create = async (data: FormData) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(httpResponse)

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
