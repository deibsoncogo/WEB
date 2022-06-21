import { RemoteExportAllUserToXLSX } from '../../../data/usecases/user/remote-exportAllUserToXLSX'
import { IExportAllUsersToXLSX } from '../../../domain/usecases/interfaces/user/exportAllUsersToXLSX'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteExportAllUsersToXLSX = (): IExportAllUsersToXLSX =>
  new RemoteExportAllUserToXLSX(makeApiUrl('user/export'), makeAxiosHttpClient())
