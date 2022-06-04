export interface IDeleteBookParams {
  id: string
}

export interface IDeleteBook {
  delete: (params: IDeleteBookParams) => Promise<string>
}
