import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IDeletePlan, IDeletePlanParams } from '../../../domain/usecases/interfaces/plan/deletePlan'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteDeletePlan implements IDeletePlan {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  delete = async (params: IDeletePlanParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
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
