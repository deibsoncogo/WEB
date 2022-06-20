import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IGetTraining,
  IGetTrainingParams,
} from '../../../domain/usecases/interfaces/trainings/getTraining'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetTraining implements IGetTraining {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  get = async (params: IGetTrainingParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'get',
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
