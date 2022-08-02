import { SalesTable } from "../../../../layout/components/tables/sales-list"
import { makeRemoteExportAllSalesToXLSX } from "../../usecases/sales/remote-exportAllSalesToXLSX-factory"
import { makeRemoteGetAllSales } from "../../usecases/sales/remote-getAllSales-factory"

export const MakeSalesTable = () => {
  return (
    <SalesTable      
      getAllSales={makeRemoteGetAllSales()}  
      exportSalesToXLSX={makeRemoteExportAllSalesToXLSX()}
    />
  )
}
