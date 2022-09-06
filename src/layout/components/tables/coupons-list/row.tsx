import { Tooltip } from '@nextui-org/react'

import { KTSVG } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

import { ICoupon } from '../../../../domain/models/coupon'
import { getIsoDateToBRL } from '../../../../utils/getIsoDateToBRL'
import { Switch } from '../../inputs/switch'

type CouponTableRowProps = {
  coupon: ICoupon
  toggleCouponStatus: (id: string) => void
  deleteCoupon: (id: string) => void
  selectCouponToBeEdited: (coupon: ICoupon) => void
}
const Row = ({
  coupon,
  toggleCouponStatus,
  deleteCoupon,
  selectCouponToBeEdited,
}: CouponTableRowProps) => {
  function handleCouponStatusChange() {
    toggleCouponStatus(coupon.id)
  }

  function handleDeleteCoupon() {
    deleteCoupon(coupon.id)
  }

  function handleSelectCouponToBeEdited() {
    selectCouponToBeEdited(coupon)
  }

  return (
    <tr>
      <td className='ps-4' scope='row'>
        <span className='w-bold d-block fs-7'>{coupon.name}</span>
      </td>

      <td className='ps-4' scope='row'>
        {coupon.type === 'percentage' ? (
          <span className='w-bold d-block fs-7'>{coupon.value}%</span>
        ) : (
          '-'
        )}
      </td>

      <td className='ps-4' scope='row'>
        {coupon.type === 'value' ? (
          <span className='w-bold d-block fs-7'>{maskedToMoney(coupon.value)}</span>
        ) : (
          '-'
        )}
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{coupon.quantity}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{getIsoDateToBRL(coupon.expirationDate)}</span>
      </td>

      <td>
        <Switch active={coupon.isActive} setModalUpdate={handleCouponStatusChange} />
      </td>

      <td className='d-flex' style={{ minWidth: '150px' }}>
        <Tooltip content={'Editar'} rounded color='primary'>
          <button
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            onClick={handleSelectCouponToBeEdited}
          >
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Tooltip>

        <Tooltip content={'Excluir'} rounded color='primary' onClick={handleDeleteCoupon}>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}

export { Row }
