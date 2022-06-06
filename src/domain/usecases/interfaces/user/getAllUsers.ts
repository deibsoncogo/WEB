import { IUserResponse } from '../../../../interfaces/api-response'
import { InputPagination } from '../../../shared/interface/InputPagination'

export interface IGetAllUsersParams extends InputPagination {
  name: string
}
export interface IGetAllUsers {
  getAll: (params: IGetAllUsersParams) => Promise<IUserResponse[]>
}
