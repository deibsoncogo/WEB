export interface IDeleteUserParams {
  id: string
}
export interface IDeleteUser {
  deleteUser: (params: IDeleteUserParams) => Promise<void>
}
