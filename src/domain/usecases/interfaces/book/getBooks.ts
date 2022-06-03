import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'

export interface GetBookParams {
  name?: string
  take?: number | string
  page?: number | string
}

export interface OutputPagination {
  data: IBookResponse[]
  total: number
  page: number | string
  take: number | string
}

export interface IGetBooks {
  get: (params: GetBookParams) => Promise<OutputPagination>
}
