import { Tooltip } from '@nextui-org/react'

import { KTSVG } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

import { useEffect } from 'react'
import { ICoupon } from '../../../../domain/models/coupon'
import { getIsoDateToBRL } from '../../../../utils/getIsoDateToBRL'
import { Switch } from '../../inputs'

type CouponTableRowProps = {
  coupon: ICoupon
  toggleCouponStatus: (id: string) => void
}
const Row = ({ coupon, toggleCouponStatus }: CouponTableRowProps) => {
  function handleCouponStatusChange() {
    toggleCouponStatus(coupon.id)
  }

  console.log(coupon)
  function handleDeleteCoupon() {}

  return (
    <tr>
      <td className='ps-4' scope='row'>
        <span className='w-bold d-block fs-7'>{coupon.name}</span>
      </td>

      <td className='ps-4' scope='row'>
        {coupon.type === 'percentage' ? (
          <span className='w-bold d-block fs-7'>{coupon.value}</span>
        ) : null}
      </td>

      <td className='ps-4' scope='row'>
        {coupon.type === 'value' ? (
          <span className='w-bold d-block fs-7'>{maskedToMoney(coupon.value)}</span>
        ) : null}
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{coupon.quantity}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{getIsoDateToBRL(coupon.expirationDate)}</span>
      </td>

      <td>
        <div className='form-check form-switch form-check-custom form-check-solid'>
          <Switch active={coupon.isActive} setModalUpdate={handleCouponStatusChange} />
        </div>
      </td>

      <td className='d-flex' style={{ minWidth: '150px' }}>
        <Tooltip content={'Editar'} rounded color='primary'>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Tooltip>

        <Tooltip content={'Deletar'} rounded color='primary' onClick={handleDeleteCoupon}>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}

export { Row }
