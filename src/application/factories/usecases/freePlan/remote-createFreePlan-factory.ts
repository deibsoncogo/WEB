import { RemoteCreateFreePlan } from '../../../../data/usecases/freePlan/remote-createFreePlan'
import { ICreateFreePlan } from '../../../../domain/usecases/interfaces/freePlan/createFreePlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteCreateFreePlan = (): ICreateFreePlan =>
  new RemoteCreateFreePlan(makeApiUrl('/freePlan'), makeAxiosHttpClient())
