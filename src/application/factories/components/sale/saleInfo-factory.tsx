import { PageSaleInfo } from '../../../../layout/components/sale/SaleInfo'
import { makeRemoteGetSale } from '../../usecases/sales/remote-getSale-factory'

interface param {
  id: string | string[] | undefined
}

export const MakePageSaleInfo = (query: param) => {
  return <PageSaleInfo id={query.id} getSale={makeRemoteGetSale()} />
}
