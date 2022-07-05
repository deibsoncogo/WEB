import { RemoteLogout } from './../../../data/usecases/user/remote-logout';
import { makeApiUrl, makeAxiosHttpClient } from '../http';
import { ILogout } from './../../../domain/usecases/interfaces/user/logout';

export const makeRemoteLogout = (): ILogout =>
  new RemoteLogout(makeApiUrl('auth/logout'), makeAxiosHttpClient());