import { SalesFilter } from "./getAllSales"

export interface IExportAllSalesParams {
  name?: string
  filters?: SalesFilter
}

export interface IExportAllSalesToXLSXResponse {
  type: string
  data: Buffer
}

export interface IExportAllSalesToXLSX {
  export: (params: IExportAllSalesParams) => Promise<IExportAllSalesToXLSXResponse>
}
