import { RemoteToggleTrainingStatus } from '../../../../data/usecases/training/remote-toggleTrainingStatus'
import { IToggleTrainingStatus } from '../../../../domain/usecases/interfaces/trainings/toggleTrainingStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleTrainingStatus = (): IToggleTrainingStatus =>
  new RemoteToggleTrainingStatus(makeApiUrl('training'), makeAxiosHttpClient())
