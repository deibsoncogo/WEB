import { IDeleteFreeContent } from './../../../../domain/usecases/interfaces/freeContent/deleteFreeContent';
import { RemoteDeleteFreeContent } from './../../../../data/usecases/freeContent/remote-deleteFreeContent';
import { makeApiUrl, makeAxiosHttpClient } from "../../http";

export const makeRemoteDeleteFreeContent = (): IDeleteFreeContent =>
  new RemoteDeleteFreeContent(makeApiUrl(`freeContent`), makeAxiosHttpClient())
