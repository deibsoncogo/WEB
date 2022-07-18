import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { IDeleteCoupon } from '../../../../domain/usecases/interfaces/coupon'
import { RemoteDeleteCoupon } from '../../../../data/usecases/coupon/remote-deleteCoupon'

export const makeRemoteDeleteCoupons = (): IDeleteCoupon => {
  return new RemoteDeleteCoupon(makeApiUrl('coupon'), makeAxiosHttpClient())
}
