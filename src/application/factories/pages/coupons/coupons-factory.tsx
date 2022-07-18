import { CouponsTemplate } from '../../../../layout/templates/coupons'
import {
  makeRemoteGetCoupons,
  makeRemoteCreateCoupons,
  makeRemoteUpdateCoupons,
  makeRemoteDeleteCoupons,
} from '../../usecases/coupons'

export const MakeCouponsPage = () => {
  return (
    <CouponsTemplate
      remoteGetCoupons={makeRemoteGetCoupons()}
      remoteCreateCoupon={makeRemoteCreateCoupons()}
      remoteUpdateCoupon={makeRemoteUpdateCoupons()}
      remoteDeleteCoupon={makeRemoteDeleteCoupons()}
    />
  )
}
