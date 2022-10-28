import { PurchaseDetails } from '../../../layout/components/purchase'
import { makeRemoteGetSale } from '../usecases/sales/remote-getSale-factory'

interface IMakePurchaseView {
  transactionId: string
}

export const MakePurchaseView = ({ transactionId }: IMakePurchaseView) => {
  return <PurchaseDetails saleId={transactionId} getSale={makeRemoteGetSale()} />
}
