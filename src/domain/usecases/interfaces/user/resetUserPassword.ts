export interface IResetUserPasswordParams {
  id: string
  password: string
  confirmPassword: string
}

export interface IResetUserPassword {
  resetPassword: (params: IResetUserPassword) => Promise<void>
}
