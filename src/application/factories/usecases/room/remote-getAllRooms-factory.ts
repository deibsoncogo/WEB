import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { makeApiUrl } from "../../http";
import { IGetAllRooms } from '../../../../domain/usecases/interfaces/room/getAllRooms';
import { RemoteGetAllRooms } from '../../../../data/usecases/room/remote-getAllRooms';


export const makeRemoteGetAllRooms = (): IGetAllRooms =>
  new RemoteGetAllRooms(makeApiUrl('/room'), makeAxiosHttpClient());
