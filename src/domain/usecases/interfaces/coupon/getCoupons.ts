import { ICoupon } from '../../../models/coupon'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetCouponsParams extends InputPagination {
  name: string
  take: number
  page: number
  order: 'asc' | 'desc' | undefined
}

export interface IGetCoupons {
  get: (params: IGetCouponsParams) => Promise<OutputPagination<ICoupon>>
}
