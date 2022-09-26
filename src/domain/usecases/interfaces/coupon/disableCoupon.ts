export interface IDisableCouponParams {
  id: string
}

export interface IDisableCoupon {
  disable: (params: IDisableCouponParams) => Promise<string>
}
