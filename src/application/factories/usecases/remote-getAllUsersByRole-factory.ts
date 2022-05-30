import { IGetAllUsersByRole } from '../../../domain/usecases/interfaces/user/getAllUsersByRole';
import { makeApiUrl, makeAxiosHttpClient } from '../http';
import { RemoteGetAllUsersByRole } from './../../../data/usecases/user/remote-getAllUsersByRole';


export const makeRemoteGetAllUsersByRole = (): IGetAllUsersByRole =>
  new RemoteGetAllUsersByRole(makeApiUrl('/user/getAllByRole'), makeAxiosHttpClient());
