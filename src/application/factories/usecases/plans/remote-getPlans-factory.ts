import { RemoteGetCategories } from '../../../../data/usecases/category/remote-getCategories'
import { IGetPlans } from '../../../../domain/usecases/interfaces/plan/getPlans'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetPlans = (): IGetPlans => {
  return new RemoteGetCategories(makeApiUrl('/plans'), makeAxiosHttpClient())
}
