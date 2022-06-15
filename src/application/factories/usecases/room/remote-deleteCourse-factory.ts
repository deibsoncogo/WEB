import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { RemoteDeleteRoom } from "../../../../data/usecases/room/remote-deleteRoom";
import { IDeleteRoom } from "../../../../domain/usecases/interfaces/room/deleteRoom";
import { makeApiUrl } from "../../http";



export const makeRemoteDeleteRoom = (): IDeleteRoom =>
  new RemoteDeleteRoom(makeApiUrl(`/room`), makeAxiosHttpClient())
