import { RemoteGetAllUserTransactions } from '../../../../data/usecases/transactions/remote-getAllUserTransactions'
import { IGetAllUserTransactions } from '../../../../domain/usecases/interfaces/transactions/getAllUserTransactions'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetAllUserTransactions = (): IGetAllUserTransactions =>
  new RemoteGetAllUserTransactions(
    makeApiUrl('transaction/currentUser/show'),
    makeAxiosHttpClient()
  )
