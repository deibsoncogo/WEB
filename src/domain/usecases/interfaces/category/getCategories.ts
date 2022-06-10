import { Category } from '../../../../interfaces/model/Category'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface GetCategoriesParams {
  name: string
  take: number
  page: number
  order: 'asc' | 'desc' | undefined
}

export interface IGetCategories {
  get: (params: GetCategoriesParams) => Promise<OutputPagination<Category>>
}
