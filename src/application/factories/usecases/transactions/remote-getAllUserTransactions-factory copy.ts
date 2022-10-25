import { RemoteGetTransactionById } from '../../../../data/usecases/transactions/remote-getTransactionById'
import { IGetTransactionById } from '../../../../domain/usecases/interfaces/transactions/getTransactionById'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetTransactionById = (transactionId: string): IGetTransactionById =>
  new RemoteGetTransactionById(makeApiUrl(`transaction/${transactionId}`), makeAxiosHttpClient())
