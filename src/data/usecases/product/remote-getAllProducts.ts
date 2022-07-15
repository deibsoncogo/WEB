import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { GetProductsParams, IGetAllProducts } from '../../../domain/usecases/interfaces/product/getAllProducts'
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse'
import { IRoomPartialResponse } from '../../../interfaces/api-response/roomPartialResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllProducts implements IGetAllProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<IRoomPartialResponse>>
  ) {}

  async getAll(query: GetProductsParams) {    
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: query
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
