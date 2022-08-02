import { SalesTable } from "../../../../layout/components/tables/sales-list"
import { makeRemoteDeleteFreeContent } from "../../usecases/freeContent/remote-deleteFreeContent-factory"
import { makeRemoteGetAllFreeContent } from "../../usecases/freeContent/remote-getAllFreeContent-factory"

export const MakeSalesTable = () => {
  return (
    <SalesTable
      getAllFreeContent={makeRemoteGetAllFreeContent()}
      deleteFreeContent={makeRemoteDeleteFreeContent()}    
    />
  )
}
