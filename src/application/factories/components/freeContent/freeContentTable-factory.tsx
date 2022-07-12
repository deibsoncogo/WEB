import { FreeContentTable } from "../../../../layout/components/tables/freeContent-list"
import { makeRemoteDeleteFreeContent } from "../../usecases/freeContent/remote-deleteFreeContent-factory"
import { makeRemoteGetAllFreeContent } from "../../usecases/freeContent/remote-getAllFreeContent-factory"

export const MakeFreeContentTable = () => {
  return (
    <FreeContentTable
      getAllFreeContent={makeRemoteGetAllFreeContent()}
      deleteFreeContent={makeRemoteDeleteFreeContent()}    
    />
  )
}
