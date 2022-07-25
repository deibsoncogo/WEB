import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  IToggleTrainingStatus,
  IToggleTrainingStatusParams,
} from '../../../domain/usecases/interfaces/trainings/toggleTrainingStatus'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteToggleCourseStatus implements IToggleTrainingStatus {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<void>) {}

  toggle = async (params: IToggleTrainingStatusParams) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: 'patch',
      body: params,
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
