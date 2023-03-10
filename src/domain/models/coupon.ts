import { Product } from './product'

export type CouponType = 'percentage' | 'value'

export interface ICoupon {
  id: string
  name: string
  type: CouponType
  value: number
  quantity: number
  isActive: boolean
  isDeleted: boolean
  expirationDate: string
  productId?: string
  product: Product
}
