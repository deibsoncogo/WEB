import { makeAxiosHttpClient } from './../http/axiosHttpClient-factory';
import { RemoteUserVerifyCPF } from "../../../data/usecases/user/remote-verifyCPF";
import { makeApiUrl } from "../http";


export const makeRemoteVerifyCPF = (): IUserVerifyCPF =>
  new RemoteUserVerifyCPF(makeApiUrl(`/user/checkCPF`), makeAxiosHttpClient())
