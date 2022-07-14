import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ITraining } from '../../../domain/models/training'
import { OutputPagination } from '../../../domain/shared/interface/OutputPagination'
import {
  IGetAllTrainings,
  IGetAllTrainingsParams,
} from '../../../domain/usecases/interfaces/trainings/getAllTrainings'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllTrainings implements IGetAllTrainings {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<OutputPagination<ITraining>>
  ) {}

  getAll = async (params: IGetAllTrainingsParams) => {
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
