import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ITransactionPagarMe } from '../../../domain/models/transactionPagarMe'
import { IGetTransactionById } from '../../../domain/usecases/interfaces/transactions/getTransactionById'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetTransactionById implements IGetTransactionById {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ITransactionPagarMe>
  ) {}

  get = async (): Promise<ITransactionPagarMe> => {
    const httpResponse = await this.httpClient.request({
      url: this.url,
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
