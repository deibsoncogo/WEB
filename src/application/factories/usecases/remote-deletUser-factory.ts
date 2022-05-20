import { RemoteDeleteUser } from '../../../data/usecases/user/remote-deleteUser'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteDeleteUser = (id: string): IDeleteUser =>
  new RemoteDeleteUser(makeApiUrl(`/user/${id}`), makeAxiosHttpClient())
