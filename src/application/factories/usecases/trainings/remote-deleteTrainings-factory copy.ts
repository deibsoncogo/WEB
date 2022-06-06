import { RemoteDeleteTraining } from '../../../../data/usecases/training/remote-deleteTraining'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteTrainings = (id: string): IDeleteTraining =>
  new RemoteDeleteTraining(makeApiUrl(`/training/${id}`), makeAxiosHttpClient())
