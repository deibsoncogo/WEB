import { makeApiUrl, makeAxiosHttpClient } from '../http'
import { RemoteUserVerifyEmail } from '../../../data/usecases/user/remote-verifyEmail'

export const makeRemoteVerifyEmail = (): IUserVerifyEmail =>
  new RemoteUserVerifyEmail(makeApiUrl(`/user/checkEmail`), makeAxiosHttpClient())
