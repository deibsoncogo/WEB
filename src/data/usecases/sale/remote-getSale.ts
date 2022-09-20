import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetSale } from '../../../domain/usecases/interfaces/sale/getSale'
import { ISalesResponse } from '../../../interfaces/api-response/salesResponse'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetSale implements IGetSale {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ISalesResponse>
  ) {}

  async get(id: string): Promise<ISalesResponse> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
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
