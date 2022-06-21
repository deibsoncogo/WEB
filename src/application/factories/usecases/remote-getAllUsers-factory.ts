import { RemoteGetAllUsers } from '../../../data/usecases/user/remote-getAllUsers'
import { IGetAllUsers } from '../../../domain/usecases/interfaces/user/getAllUsers'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteGetAllUsers = (): IGetAllUsers =>
  new RemoteGetAllUsers(makeApiUrl('user'), makeAxiosHttpClient());
