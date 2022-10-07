import { RemoteToggleFreePlanStatus } from '../../../../data/usecases/freePlan/remote-toggleFreePlanStatus'
import { IToggleFreePlanStatus } from '../../../../domain/usecases/interfaces/freePlan/toggleFreePlanStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteTogglePlanStatus = (): IToggleFreePlanStatus =>
  new RemoteToggleFreePlanStatus(makeApiUrl('/freePlan/toggleStatus'), makeAxiosHttpClient())
