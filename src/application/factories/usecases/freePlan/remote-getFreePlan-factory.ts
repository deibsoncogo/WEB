import { RemoteGetFreePlan } from '../../../../data/usecases/freePlan/remote-getFreePlan'
import { IGetFreePlan } from '../../../../domain/usecases/interfaces/freePlan/getFreePlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetFreePlan = (): IGetFreePlan =>
  new RemoteGetFreePlan(makeApiUrl('/freePlan/show'), makeAxiosHttpClient())
