import { ICoupon } from '../../../models/coupon'

export interface IToggleCouponStatusParams {
  id: string
}

export interface IToggleCouponStatus {
  toggle: (params: IToggleCouponStatusParams) => Promise<ICoupon>
}
