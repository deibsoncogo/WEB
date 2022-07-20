import { GetNotificationParams, IGetAllNotification } from './../../../domain/usecases/interfaces/notification/getAllNotification';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';
import { INotificationResponse } from '../../../interfaces/api-response/notificationResponse';


export class RemoteGetAllNotification implements IGetAllNotification{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<INotificationResponse>>
  ) {}

  getAll = async (query: GetNotificationParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query,
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
