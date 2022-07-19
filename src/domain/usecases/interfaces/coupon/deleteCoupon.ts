export interface IDeleteCouponParams {
  id: string
}

export interface IDeleteCoupon {
  delete: (params: IDeleteCouponParams) => Promise<string>
}
