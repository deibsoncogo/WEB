import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { makeApiUrl } from '../../http';
import { RemoteUpdateFreeContent } from './../../../../data/usecases/freeContent/remote-updateFreeContent';
import { IUpdateFreeContent } from './../../../../domain/usecases/interfaces/freeContent/updateFreeContent';


export const makeRemoteUpdateFreeContent = (): IUpdateFreeContent =>
  new RemoteUpdateFreeContent(makeApiUrl('freeContent'), makeAxiosHttpClient());