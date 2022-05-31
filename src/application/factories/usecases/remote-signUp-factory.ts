import { RemoteUserSignUp } from './../../../data/usecases/user/remote-userSignUp';
import { RemoteLogout } from '../../../data/usecases/user/remote-logout';
import { IUserSignUp } from '../../../domain/usecases/interfaces/user/userSignUp';
import { makeApiUrl, makeAxiosHttpClient } from '../http';


export const makeRemoteSignUp = (): IUserSignUp =>
  new RemoteUserSignUp(makeApiUrl('user/anyType'), makeAxiosHttpClient());