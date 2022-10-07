import { RemoteEditFreePlan } from '../../../../data/usecases/freePlan/remote-editFreePlan'
import { IEditPlan } from '../../../../domain/usecases/interfaces/plan/updatePlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteEditFreePlan = (): IEditPlan =>
  new RemoteEditFreePlan(makeApiUrl('/freePlan'), makeAxiosHttpClient())
