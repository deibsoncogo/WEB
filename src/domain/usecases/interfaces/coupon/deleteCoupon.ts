export interface DeleteCouponParams {
  id: string
}

export interface IDeleteCoupon {
  delete: (params: DeleteCouponParams) => Promise<string>
}
