import { RemoteGetFreePlans } from '../../../../data/usecases/freePlan/remote-getFreePlans'
import { IGetFreePlans } from '../../../../domain/usecases/interfaces/freePlan/getFreePlans'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteGetFreePlans = (): IGetFreePlans => {
  return new RemoteGetFreePlans(makeApiUrl('/freePlan'), makeAxiosHttpClient())
}
