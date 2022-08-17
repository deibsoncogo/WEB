import { IFreeContentResponse } from '../../../../interfaces/api-response/freeContentResponse';
import { ISalesResponse } from '../../../../interfaces/api-response/salesResponse';
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";

export interface SalesFilter {
  initialDate: string
  finalDate: string
  status: string
}

export interface GetSalesParams extends InputPagination {
  name?: string 
  filters?: SalesFilter
}

export interface IGetAllSales {
  getAll:(params: GetSalesParams ) => Promise<OutputPagination<ISalesResponse>>
}
