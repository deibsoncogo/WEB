import { ICoupon } from '../../../models/coupon'

export type CreateCouponParams = Omit<ICoupon, 'id'>

export interface ICreateCoupon {
  create: (params: CreateCouponParams) => Promise<string>
}
