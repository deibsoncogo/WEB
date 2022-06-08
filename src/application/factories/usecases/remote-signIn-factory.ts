import { makeAxiosHttpClient } from './../http/axiosHttpClient-factory';
import { RemoteUserSignIn } from './../../../data/usecases/user/remote-userSignIn';
import { IUserSignIn } from "../../../domain/usecases/interfaces/user/userSignIn";
import { makeApiUrl } from '../http';



export const makeRemoteSignIn = (): IUserSignIn =>
  new RemoteUserSignIn(makeApiUrl('/auth/admin/login'), makeAxiosHttpClient());