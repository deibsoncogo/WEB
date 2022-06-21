import { RemoteGetTraining } from '../../../../data/usecases/training/remote-getTraining'
import { IGetTraining } from '../../../../domain/usecases/interfaces/trainings/getTraining'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetTraining = (): IGetTraining =>
  new RemoteGetTraining(makeApiUrl('training'), makeAxiosHttpClient())
