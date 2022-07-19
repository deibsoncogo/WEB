import { CouponsTemplate } from '../../../../layout/templates/coupons'
import {
  makeRemoteGetCoupons,
  makeRemoteCreateCoupons,
  makeRemoteUpdateCoupons,
  makeRemoteDeleteCoupons,
} from '../../usecases/coupons'
import { makeRemoteToggleCouponStatus } from '../../usecases/coupons/remote-toggleCouponStatus-factory'

export const MakeCouponsPage = () => {
  return (
    <CouponsTemplate
      remoteGetCoupons={makeRemoteGetCoupons()}
      remoteCreateCoupon={makeRemoteCreateCoupons()}
      remoteUpdateCoupon={makeRemoteUpdateCoupons()}
      remoteDeleteCoupon={makeRemoteDeleteCoupons()}
      remoteToggleCouponStatus={makeRemoteToggleCouponStatus()}
    />
  )
}
