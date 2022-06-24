import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IEditPlan } from '../../../domain/usecases/interfaces/plan/updatePlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteEditPlan implements IEditPlan {
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
