import { SalesTable } from "../../../../layout/components/tables/sales-list"
import { makeRemoteDeleteFreeContent } from "../../usecases/freeContent/remote-deleteFreeContent-factory"
import { makeRemoteGetAllSales } from "../../usecases/sales/remote-getAllSales-factory"

export const MakeSalesTable = () => {
  return (
    <SalesTable
      getAllSales={makeRemoteGetAllSales()}  
    />
  )
}
