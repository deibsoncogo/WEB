import { PurchaseDetails } from '../../../layout/components/purchase'

interface IMakePurchaseView {
  transactionId: string
}

export const MakePurchaseView = ({ transactionId }: IMakePurchaseView) => {
  return <PurchaseDetails transactionId={transactionId} />
}
