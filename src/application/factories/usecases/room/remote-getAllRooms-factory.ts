import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { IGetAllRooms } from '../../../../domain/usecases/interfaces/room/getAllRooms';
import { RemoteGetAllRooms } from '../../../../data/usecases/room/remote-getAllRooms';


export const makeRemoteGetAllRooms = (): IGetAllRooms => {
  return new RemoteGetAllRooms(makeApiUrl('/room'), makeAxiosHttpClient());
}
