import { Category } from '../../../../interfaces/model/Category'

export interface GetCategoriesParams {
  name: string
  take: number
  page: number
  order: 'asc' | 'desc' | undefined
}

export interface OutputPagination {
  data: Category[]
  total: number
  page: number
}

export interface IGetCategories {
  get: (params: GetCategoriesParams) => Promise<OutputPagination>
}
