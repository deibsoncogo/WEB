import { RemoteCreateFreeContent } from './../../../../data/usecases/freeContent/remote-createFreeContent';
import { ICreateFreeContent } from './../../../../domain/usecases/interfaces/freeContent/createFreeContent';
import { makeApiUrl, makeAxiosHttpClient } from "../../http";



export const makeRemoteCreateFreeContent = (): ICreateFreeContent =>
     new RemoteCreateFreeContent(makeApiUrl('freeContent'), makeAxiosHttpClient());