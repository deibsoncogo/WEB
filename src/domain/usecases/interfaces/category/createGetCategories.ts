import { Category } from '../../../../interfaces/model/Category'

export interface CreateCategoryParams {
  name: string
}

export interface IGetCategories {
  get: () => Promise<Category[]>
}
