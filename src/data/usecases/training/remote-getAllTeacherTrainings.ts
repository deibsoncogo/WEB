import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ITraining } from '../../../domain/models/training'
import { GetTrainingParams, IGetAllTeacherTrainings } from '../../../domain/usecases/interfaces/trainings/getAllTeacherTrainings'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllTeacherTrainings implements IGetAllTeacherTrainings {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<ITraining>>
  ) {}

  getAll = async (params: GetTrainingParams, userId: string) => {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/teacher/${userId}`,
      method: 'get',
      params,
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
