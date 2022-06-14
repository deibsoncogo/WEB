import { RemoteGetAllrooms } from './../../../../data/usecases/room/remote-getAllRooms';
import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { makeApiUrl } from "../../http";
import { IGetAllRooms } from '../../../../domain/usecases/interfaces/room/getAllRooms';


export const makeRemoteGetAllRooms = (): IGetAllRooms =>
  new RemoteGetAllrooms(makeApiUrl('/room'), makeAxiosHttpClient());
