import { RemoteDisableCoupon } from '../../../../data/usecases/coupon/remote-disableCoupon'
import { IDisableCoupon } from '../../../../domain/usecases/interfaces/coupon/disableCoupon'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteDisableCoupon = (): IDisableCoupon =>
  new RemoteDisableCoupon(makeApiUrl('/coupon/disable'), makeAxiosHttpClient())
