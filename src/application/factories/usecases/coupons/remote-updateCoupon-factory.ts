import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { IUpdateCoupon } from '../../../../domain/usecases/interfaces/coupon'
import { RemoteUpdateCoupon } from '../../../../data/usecases/coupon/remote-updateCoupon'

export const makeRemoteUpdateCoupons = (): IUpdateCoupon => {
  return new RemoteUpdateCoupon(makeApiUrl('coupon'), makeAxiosHttpClient())
}
