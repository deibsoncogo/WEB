export interface DeleteCategoryParams {
  id: string
}

export interface IDeleteCategory {
  delete: (params: DeleteCategoryParams) => Promise<string>
}
