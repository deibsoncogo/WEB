import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { makeApiUrl } from '../../http';
import { RemoteGetFreeContent } from './../../../../data/usecases/freeContent/remote-getFreeContent';
import { IGetFreeContent } from './../../../../domain/usecases/interfaces/freeContent/getFreeContent';

export const makeRemoteGetFreeContent = (): IGetFreeContent =>
  new RemoteGetFreeContent(makeApiUrl('freeContent'), makeAxiosHttpClient());