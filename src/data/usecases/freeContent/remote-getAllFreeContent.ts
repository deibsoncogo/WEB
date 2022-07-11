import { IFreeContentResponse } from './../../../interfaces/api-response/freeContentResponse';
import { GetFreeContentParams, IGetAllFreeContent } from './../../../domain/usecases/interfaces/freeContent/getAllRooms';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';


export class RemoteGetAllFreeContent implements IGetAllFreeContent {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IFreeContentResponse>>
  ) {}

  getAll = async (query: GetFreeContentParams) => {
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
