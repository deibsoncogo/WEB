import { RemoteGetRoom } from '../../../../data/usecases/room/remote-getRoom';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';
import { IGetRoom } from './../../../../domain/usecases/interfaces/room/getCourse';

export const makeRemoteGetRoom = (): IGetRoom =>
  new RemoteGetRoom(makeApiUrl('/room'), makeAxiosHttpClient());