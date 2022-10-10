import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { IGetSale } from '../../../domain/usecases/interfaces/sale/getSale'
import { ISaleInformation } from '../../../interfaces/api-response/saleInformations'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetSale implements IGetSale {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ISaleInformation>
  ) {}

  async get(id: string): Promise<ISaleInformation> {
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
