import { RemoteTogglePlanStatus } from '../../../../data/usecases/plan/remote-togglePlanStatus'
import { ITogglePlanStatus } from '../../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteTogglePlanStatus = (): ITogglePlanStatus =>
  new RemoteTogglePlanStatus(makeApiUrl('/plans/toggleStatus'), makeAxiosHttpClient())
