import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialProductResponse } from "../../../../interfaces/api-response/productsPartialResponse";
import { InputPagination } from "../../../shared/interface/InputPagination";

export interface GetProductsParams extends InputPagination {
  name: string  
}

export interface IGetAllProducts {
    getAll:(params: GetProductsParams ) => Promise<apiPaginationResponse<IPartialProductResponse>>
}

