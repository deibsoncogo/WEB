import { RemoteEditPlan } from '../../../../data/usecases/plan/remote-editPlan'
import { IEditPlan } from '../../../../domain/usecases/interfaces/plan/updatePlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteEditPlan = (): IEditPlan =>
  new RemoteEditPlan(makeApiUrl('/plans'), makeAxiosHttpClient())
