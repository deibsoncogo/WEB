import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { ICreateCoupon } from '../../../../domain/usecases/interfaces/coupon'
import { RemoteCreateCoupon } from '../../../../data/usecases/coupon/remote-createCoupon'

export const makeRemoteCreateCoupons = (): ICreateCoupon => {
  return new RemoteCreateCoupon(makeApiUrl('coupon'), makeAxiosHttpClient())
}
