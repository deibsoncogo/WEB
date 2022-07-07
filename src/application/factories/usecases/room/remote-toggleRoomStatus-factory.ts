import { RemoteToggleRoomStatus } from '../../../../data/usecases/room/remote-toggleRoomStatus'
import { IToggleRoomStatus } from '../../../../domain/usecases/interfaces/room/toggleRoomStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleRoomStatus = (): IToggleRoomStatus =>
  new RemoteToggleRoomStatus(makeApiUrl('/room/toggleStatus'), makeAxiosHttpClient())
