import { RemoteCreatePlan } from '../../../../data/usecases/plan/remote-createPlan'
import { ICreatePlan } from '../../../../domain/usecases/interfaces/plan/createPlan'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteCreatePlan = (): ICreatePlan =>
  new RemoteCreatePlan(makeApiUrl('/plans'), makeAxiosHttpClient())
