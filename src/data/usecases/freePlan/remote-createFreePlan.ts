import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ICreateFreePlan } from '../../../domain/usecases/interfaces/freePlan/createFreePlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteCreateFreePlan implements ICreateFreePlan {
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

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return httpResponse.body
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError([httpResponse.body?.message])
      default:
        throw new UnexpectedError()
    }
  }
}
