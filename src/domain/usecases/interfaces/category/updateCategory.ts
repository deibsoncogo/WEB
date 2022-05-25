export interface UpdateCategoryParams {
  id: string
  name: string
}

export interface IUpdateCategory {
  update: (params: UpdateCategoryParams) => Promise<string>
}
