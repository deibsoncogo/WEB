import { RemoteDeleteFreePlan } from '../../../../data/usecases/freePlan/remote-deleteFreePlan'
import { IDeleteFreePlan } from '../../../../domain/usecases/interfaces/freePlan/deleteFreePlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteFreePlan = (): IDeleteFreePlan =>
  new RemoteDeleteFreePlan(makeApiUrl('/freePlan'), makeAxiosHttpClient())
