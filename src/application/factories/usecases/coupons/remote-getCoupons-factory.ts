import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { RemoteGetCoupons } from '../../../../data/usecases/coupon/remote-getCoupons'
import { IGetCoupons } from '../../../../domain/usecases/interfaces/coupon/getCoupons'

export const makeRemoteGetCoupons = (): IGetCoupons => {
  return new RemoteGetCoupons(makeApiUrl('coupon'), makeAxiosHttpClient())
}
