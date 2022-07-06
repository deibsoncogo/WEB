import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { RemoteUpdateTraining } from '../../../../data/usecases/training/remote-updateTraining'

export const makeRemoteUpdateTraining = (): IUpdateTraining =>
  new RemoteUpdateTraining(makeApiUrl('training'), makeAxiosHttpClient())
