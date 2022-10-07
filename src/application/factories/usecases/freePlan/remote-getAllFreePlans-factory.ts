import { RemoteGetAllFreePlans } from '../../../../data/usecases/freePlan/remote-getAllFreePlans'
import { IGetAllPlans } from '../../../../domain/usecases/interfaces/plans/getAllPlans'
import { makeApiUrl } from '../../http'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteGetAllFreePlans = (): IGetAllPlans =>
  new RemoteGetAllFreePlans(makeApiUrl('/freePlan'), makeAxiosHttpClient())
