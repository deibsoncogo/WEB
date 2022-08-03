import { GetSalesParams } from './../../../domain/usecases/interfaces/sale/getAllSales';
import { HttpClient, HttpStatusCode } from '../../protocols';
import { apiPaginationResponse } from '../../../interfaces/api-response/apiPaginationResponse';
import { InvalidParamsError, UnexpectedError } from '../../../domain/errors';
import { ISalesResponse } from '../../../interfaces/api-response/salesResponse';
import { IGetAllSales } from '../../../domain/usecases/interfaces/sale/getAllSales';


export class RemoteGetAllSales implements IGetAllSales{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<apiPaginationResponse<ISalesResponse>>
  ) {}

  getAll = async (query: GetSalesParams) => {
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
