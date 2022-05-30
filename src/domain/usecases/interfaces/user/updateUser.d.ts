import { UserUpdate } from '../../../models/userUpdate'

export interface IUpdateUser {
  updateUser: (userUpdate: UserUpdate) => Promise<void>
}
