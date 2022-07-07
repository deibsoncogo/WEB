import { RemoteDeleteUser } from '../../../data/usecases/user/remote-deleteUser'
import { IDeleteUser } from '../../../domain/usecases/interfaces/user/deleteUser'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteDeleteUser = (): IDeleteUser =>
  new RemoteDeleteUser(makeApiUrl(`user`), makeAxiosHttpClient())
