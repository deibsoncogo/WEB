import { apiPaginationResponse } from '../../../../interfaces/api-response/apiPaginationResponse'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'
import { InputPagination } from '../../../shared/interface/InputPagination'

export interface GetProductsAvailableParams extends InputPagination {
  name: string
}

export interface IGetAllAvailableProducts {
  getAll: (
    params: GetProductsAvailableParams
  ) => Promise<apiPaginationResponse<IPartialProductResponse>>
}
