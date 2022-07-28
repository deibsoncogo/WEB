import { CouponsTemplate } from '../../../../layout/templates/coupons'
import {
  makeRemoteCreateCoupons,
  makeRemoteDeleteCoupons,
  makeRemoteGetCoupons,
  makeRemoteUpdateCoupons,
} from '../../usecases/coupons'
import { makeRemoteToggleCouponStatus } from '../../usecases/coupons/remote-toggleCouponStatus-factory'
import { makeRemoteGetAllAvailableProducts } from '../../usecases/product/remote-getAllAvailableProducts-factory'

export const MakeCouponsPage = () => {
  return (
    <CouponsTemplate
      remoteGetCoupons={makeRemoteGetCoupons()}
      remoteCreateCoupon={makeRemoteCreateCoupons()}
      remoteUpdateCoupon={makeRemoteUpdateCoupons()}
      remoteDeleteCoupon={makeRemoteDeleteCoupons()}
      remoteToggleCouponStatus={makeRemoteToggleCouponStatus()}
      remoteGetAllAvailableProducts={makeRemoteGetAllAvailableProducts()}
    />
  )
}
