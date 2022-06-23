import { RemoteGetAllRooms } from '../../../../data/usecases/room/remote-getAllrooms'
import { IGetAllRooms } from '../../../../domain/usecases/interfaces/rooms/getAllRooms'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetAllRooms = (): IGetAllRooms => {
  return new RemoteGetAllRooms(makeApiUrl('/room'), makeAxiosHttpClient())
}
