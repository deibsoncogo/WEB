import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IExportAllSalesParams, IExportAllSalesToXLSX } from '../../../domain/usecases/interfaces/sale/exportAllSalesToXLSX'
import { IUserResponse } from '../../../interfaces/api-response'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteExportAllSalesToXLSX implements IExportAllSalesToXLSX {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<IUserResponse[]>
  ) {}

  export = async (params: IExportAllSalesParams) => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      params: params,
      responseType: 'blob',
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          data: httpResponse.response.data,
          type: httpResponse?.response.data.type,
        }
      case HttpStatusCode.badRequest:
        throw new InvalidParamsError(httpResponse.body?.message)
      default:
        throw new UnexpectedError()
    }
  }
}
