export interface CreateCategoryParams {
  name: string
}

export interface ICreateCategory {
  create: (params: CreateCategoryParams) => Promise<string>
}
