import { RemoteUpdateUser } from '../../../data/usecases/user/remote-updateUser'
import { IUpdateUser } from '../../../domain/usecases/interfaces/user/updateUser'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteUpdateUser = (): IUpdateUser =>
  new RemoteUpdateUser(makeApiUrl(`/user`), makeAxiosHttpClient())
