import { PurchaseDetails } from '../../../layout/components/purchase'
import { makeRemoteGetUser } from '../usecases/remote-getUser-factory'

interface IMakePurchaseView {
  userId: string
  transactionId: string
}

export const MakePurchaseView = ({ userId, transactionId }: IMakePurchaseView) => {
  return <PurchaseDetails transactionId={transactionId} getUser={makeRemoteGetUser(userId)} />
}
