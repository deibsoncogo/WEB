import { ICoupon } from '../../../models/coupon'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetCouponsParams extends InputPagination {}

export interface IGetCoupons {
  get: (params: IGetCouponsParams) => Promise<OutputPagination<ICoupon>>
}
