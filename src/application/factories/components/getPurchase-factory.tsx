import { PurchaseDetails } from '../../../layout/components/purchase'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'
import { makeRemoteGetAllUserTransactions } from '../usecases/transactions/remote-getAllUserTransactions-factory'
import { makeRemoteGetTransactionById } from '../usecases/transactions/remote-getAllUserTransactions-factory copy'

interface IMakePurchaseView {
  transactionId: string
}

export const MakePurchaseView = ({ transactionId }: IMakePurchaseView) => {
  return <PurchaseDetails remoteGetTransactionById={makeRemoteGetTransactionById(transactionId)} />
}
