import { IUserResponse } from '../../../../interfaces/api-response'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'
import { Role } from './role'

export interface IGetAllUsersParams extends InputPagination {
  name: string
  role?: Role
}
export interface IGetAllUsers {
  getAll: (params: IGetAllUsersParams) => Promise<OutputPagination<IUserResponse>>
}
