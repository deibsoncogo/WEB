import { ICoupon } from '../../../models/coupon'

export type UpdateCouponParams = Omit<ICoupon, 'id'>

export interface IUpdateCoupon {
  update: (params: UpdateCouponParams) => Promise<string>
}
