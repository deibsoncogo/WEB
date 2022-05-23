import { Category } from '../../../../interfaces/model/Category'

export interface GetCategoriesParams {
  filters?: Partial<Category>
  take: number
  skip: number
  page: number
}

export interface OutputPagination {
  data: Category[]
  total: number
  page: number
}

export interface IGetCategories {
  get: (params: GetCategoriesParams) => Promise<OutputPagination>
}
