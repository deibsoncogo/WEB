import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import {
  GetProductsAvailableParams,
  IGetAllAvailableProducts,
} from '../../../domain/usecases/interfaces/product/getAllAvailableProducts'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IRoomPartialResponse } from '../../../interfaces/api-response/roomPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllAvailableProducts implements IGetAllAvailableProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IRoomPartialResponse>>
  ) {}

  getAll = async (query: GetProductsAvailableParams) => {
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
