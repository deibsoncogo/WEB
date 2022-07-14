import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialPlansResponse } from "../../../../interfaces/api-response/plansPartialResponse";
import { InputPagination } from "../../../shared/interface/InputPagination";


export interface GetPlansParams extends InputPagination {
  name: string  
}

export interface IGetAllPlans {
    getAll:(params: GetPlansParams) => Promise<apiPaginationResponse<IPartialPlansResponse>>
}
