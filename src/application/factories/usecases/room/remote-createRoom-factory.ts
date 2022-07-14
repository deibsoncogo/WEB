import { RemoteCreateRoom } from '../../../../data/usecases/room/remote-createRoom';
import { ICreateRoom } from "../../../../domain/usecases/interfaces/room/createRoom";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";



export const makeRemoteCreateRoom = (): ICreateRoom =>
     new RemoteCreateRoom(makeApiUrl('room'), makeAxiosHttpClient());