import { RemoteGetUser } from '../../../data/usecases/user/remote-getUser'
import { IGetUser } from '../../../domain/usecases/interfaces/user/getUser'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteGetUser = (id: string): IGetUser =>
  new RemoteGetUser(makeApiUrl(`user/${id}`), makeAxiosHttpClient())
