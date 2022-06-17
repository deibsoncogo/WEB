import { RemoteEditTraining } from '../../../../data/usecases/training/remote-editTraining'
import { IEditTraining } from '../../../../domain/usecases/interfaces/trainings/editTraining'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteEditTraining = (): IEditTraining =>
  new RemoteEditTraining(makeApiUrl('/training'), makeAxiosHttpClient())
