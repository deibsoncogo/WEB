import { RemoteCreateTraining } from '../../../../data/usecases/training/remote-createTraining'
import { ICreateTraining } from '../../../../domain/usecases/interfaces/trainings/createTraining'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteCreateTreaning = (): ICreateTraining =>
  new RemoteCreateTraining(makeApiUrl('/training'), makeAxiosHttpClient())
