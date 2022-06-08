import { RemoteGetAllTrainings } from '../../../../data/usecases/training/remote-getAllTrainings'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetAllTrainings = (): IGetAllTrainings =>
  new RemoteGetAllTrainings(makeApiUrl('training'), makeAxiosHttpClient())
