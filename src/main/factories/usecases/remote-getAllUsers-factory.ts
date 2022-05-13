import { RemoteGetAllUsers } from './../../../data/usecases/user/remote-getAllUsers';
import { IGetAllUsers } from './../../../domain/usecases/interfaces/user/getAllUsers';
import {makeApiUrl, makeAxiosHttpClient} from '../../factories/http';


export const makeRemoteGetAllUsers = (): IGetAllUsers =>
  new RemoteGetAllUsers(makeApiUrl('/user'), makeAxiosHttpClient());