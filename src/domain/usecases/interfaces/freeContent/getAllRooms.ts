import { IFreeContentResponse } from './../../../../interfaces/api-response/freeContentResponse';
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";


export interface GetFreeContentParams extends InputPagination {
  name?: string  
}

export interface IGetAllFreeContent {
  getAll:(params: GetFreeContentParams ) => Promise<OutputPagination<IFreeContentResponse>>
}
