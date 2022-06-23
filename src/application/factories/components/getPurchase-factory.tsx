import { PurchaseDetails } from '../../../layout/components/purchase'

interface IMakePurchaseView {
  userId: string
  transactionId: string
}

export const MakePurchaseView = ({ userId, transactionId }: IMakePurchaseView) => {
  return <PurchaseDetails userId={userId} transactionId={transactionId} />
}
