export interface DeleteBookParams {
  id: string
}

export interface IDeleteBook {
  delete: (params: DeleteBookParams) => Promise<string>
}
