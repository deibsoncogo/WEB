import { RemoteGetZoomUsers } from '../../../../data/usecases/zoom/remote-getZoomUsers'
import { IGetZoomUsers } from '../../../../domain/usecases/interfaces/zoom/getZoomUsers'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetZoomUsers = (): IGetZoomUsers =>
  new RemoteGetZoomUsers(makeApiUrl('/zoom'), makeAxiosHttpClient())
