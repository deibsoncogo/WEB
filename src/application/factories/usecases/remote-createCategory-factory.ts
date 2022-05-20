import { RemoteCreateCategory } from '../../../data/usecases/category/remote-createCategory'
import { RemoteGetAllUsers } from '../../../data/usecases/user/remote-getAllUsers'
import { ICreateCategory } from '../../../domain/usecases/interfaces/category/createCategory'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteCreateCategory = (): ICreateCategory => {
  return new RemoteCreateCategory(makeApiUrl('/category'), makeAxiosHttpClient())
}
