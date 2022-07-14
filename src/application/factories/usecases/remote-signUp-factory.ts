import { RemoteUserSignUp } from './../../../data/usecases/user/remote-userSignUp'
import { makeApiUrl, makeAxiosHttpClient } from '../http'
import { IUserSignUp } from '../../../domain/usecases/interfaces/user/userSignUp'

export const makeRemoteSignUp = (): IUserSignUp =>
  new RemoteUserSignUp(makeApiUrl('/user/anyType'), makeAxiosHttpClient())
