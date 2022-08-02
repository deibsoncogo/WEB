import { IFreeContentResponse } from '../../../../interfaces/api-response/freeContentResponse';
import { ISalesResponse } from '../../../../interfaces/api-response/salesResponse';
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";

export interface TypeFilter {
  startDate: Date
  endDate: Date
  status: TypeFilter
}

export interface GetSalesParams extends InputPagination {
  name?: string 
  filters?: string
}

export interface IGetAllSales {
  getAll:(params: GetSalesParams ) => Promise<OutputPagination<ISalesResponse>>
}
