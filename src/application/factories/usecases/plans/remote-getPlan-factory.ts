import { RemoteGetPlan } from '../../../../data/usecases/plan/remote-getPlan'
import { IGetPlan } from '../../../../domain/usecases/interfaces/plan/getPlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetPlan = (): IGetPlan =>
  new RemoteGetPlan(makeApiUrl('/plans/show'), makeAxiosHttpClient())
