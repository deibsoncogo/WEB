import { apiPaginationResponse } from '../../../../interfaces/api-response/apiPaginationResponse'
import { IPartialPlansResponse } from '../../../../interfaces/api-response/plansPartialResponse'
import { InputPagination } from '../../../shared/interface/InputPagination'

export interface GetFreePlansParams extends InputPagination {
  name: string
}

export interface IGetAllFreePlans {
  getAll: (params: GetFreePlansParams) => Promise<apiPaginationResponse<IPartialPlansResponse>>
}
