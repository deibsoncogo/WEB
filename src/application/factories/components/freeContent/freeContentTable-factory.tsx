import { FreeContentTable } from "../../../../layout/components/tables/freeContent-list"
import { makeRemoteGetAllFreeContent } from "../../usecases/freeContent/remote-getAllFreeContent-factory"

export const MakeFreeContentTable = () => {
  return (
    <FreeContentTable
      getAllFreeContent={makeRemoteGetAllFreeContent()}
      deleteFreeContent={()=> console.log}    
    />
  )
}
