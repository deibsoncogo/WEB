import { RemoteToggleCouponStatus } from '../../../../data/usecases/coupon/remote-toggleCouponStatus'
import { IToggleCouponStatus } from '../../../../domain/usecases/interfaces/coupon/toggleCouponStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleCouponStatus = (): IToggleCouponStatus =>
  new RemoteToggleCouponStatus(makeApiUrl('/coupon/toggleStatus'), makeAxiosHttpClient())
