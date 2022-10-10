import { RemoteDeleteCoupon } from '../../../../data/usecases/coupon/remote-deleteCoupon'
import { IDeleteCoupon } from '../../../../domain/usecases/interfaces/coupon/deleteCoupon'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDeleteCoupon = (): IDeleteCoupon =>
  new RemoteDeleteCoupon(makeApiUrl('/coupon/:id'), makeAxiosHttpClient())
