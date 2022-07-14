import { RemoteResetUserPassword } from '../../../data/usecases/user/remote-resetUserPassword'
import { IResetUserPassword } from '../../../domain/usecases/interfaces/user/resetUserPassword'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteResetUserPassword = (): IResetUserPassword =>
  new RemoteResetUserPassword(makeApiUrl(`user`), makeAxiosHttpClient())
