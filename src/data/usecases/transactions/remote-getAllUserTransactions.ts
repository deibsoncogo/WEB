import { InvalidParamsError, UnexpectedError } from '../../../domain/errors'
import { ITransaction } from '../../../domain/models/transaction'
import { IGetAllUserTransactions } from '../../../domain/usecases/interfaces/transactions/getAllUserTransactions'
import { HttpClient, HttpStatusCode } from '../../protocols'

export class RemoteGetAllUserTransactions implements IGetAllUserTransactions {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<ITransaction[]>
  ) {}

  getAll = async (id: string) => {
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
