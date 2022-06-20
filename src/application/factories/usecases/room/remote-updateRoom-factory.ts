import { RemoteUpdateRoom } from './../../../../data/usecases/room/remote-updateRoom';
import { IUpdateRoom } from './../../../../domain/usecases/interfaces/room/updateRoom';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';



export const makeRemoteUpdateRoom = (): IUpdateRoom =>
  new RemoteUpdateRoom(makeApiUrl('/room'), makeAxiosHttpClient());