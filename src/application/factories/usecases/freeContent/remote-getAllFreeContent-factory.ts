import { RemoteGetAllFreeContent } from './../../../../data/usecases/freeContent/remote-getAllFreeContent';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';
import { IGetAllFreeContent } from '../../../../domain/usecases/interfaces/freeContent/getAllFreeContent';


export const makeRemoteGetAllFreeContent = (): IGetAllFreeContent =>
  new RemoteGetAllFreeContent(makeApiUrl('freeContent'), makeAxiosHttpClient());
