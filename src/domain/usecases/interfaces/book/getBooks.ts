import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'

export interface GetBookParams {
  id?: string | string[] | undefined
  name?: string
  take?: number | string
  page?: number | string
}

export interface GetBookParamsById {
  id: string | undefined
}

export interface UpdateBookParams {
  data: FormData
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

export interface IGetBookById {
  get: (params: GetBookParamsById) => Promise<OutputPagination>
}
