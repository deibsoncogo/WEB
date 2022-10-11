import { RemoteDeletePlan } from '../../../../data/usecases/plan/remote-deletePlan'
import { IDeletePlan } from '../../../../domain/usecases/interfaces/plan/deletePlan'

import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeletePlan = (): IDeletePlan =>
  new RemoteDeletePlan(makeApiUrl('/plans'), makeAxiosHttpClient())
