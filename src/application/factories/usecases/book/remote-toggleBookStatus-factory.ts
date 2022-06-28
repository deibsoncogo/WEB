import { RemoteToggleBookStatus } from '../../../../data/usecases/book/remote-toggleBookStatus'
import { IToggleBookStatus } from '../../../../domain/usecases/interfaces/book/toggleBookStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleBookStatus = (): IToggleBookStatus =>
  new RemoteToggleBookStatus(makeApiUrl('/book'), makeAxiosHttpClient())
