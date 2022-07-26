import { RemoteGetPlanss } from '../../../../data/usecases/plan/remote-getPlans'
import { IGetPlans } from '../../../../domain/usecases/interfaces/plan/getPlans'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetPlans = (): IGetPlans => {
  return new RemoteGetPlanss(makeApiUrl('/plans'), makeAxiosHttpClient())
}
