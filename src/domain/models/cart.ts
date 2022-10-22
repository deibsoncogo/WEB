import { UserInfoModel } from '../../helpers'
import { ICoupon } from './coupon'
import { Product } from './product'
import { ITransaction } from './transaction'

export interface ICart {
  id?: string
  subtotal?: number
  total?: number
  userId: string
  user?: Partial<UserInfoModel>
  couponId?: string
  createdAt?: Date
  products?: Product[]
  transaction?: ITransaction[]
  coupon?: ICoupon
  discountCoupon?: number
  higherNumberOfInstallments?: number
  opened?: boolean
  hasRecurringPlan?: boolean
}
