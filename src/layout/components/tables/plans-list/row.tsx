import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { IPlan } from '../../../../domain/models/plan'
import { ITogglePlanStatusParams } from '../../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { KTSVG } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

type PlanTableRowProps = {
  plan: IPlan
  togglePlanStatus: (params: ITogglePlanStatusParams) => void
}
const PlanTableRow = ({ plan, togglePlanStatus }: PlanTableRowProps) => {
  const handlePlanStatusChange = () => {
    togglePlanStatus({ id: String(plan.id) })
  }
  return (
    <tr>
      <td className='ps-4' scope='row'>
        <span className='w-bold d-block fs-7'>{plan.name}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='w-bold d-block fs-7'>{plan.description}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{maskedToMoney(plan.price)}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{plan.intervalPaymentMonths}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{plan.intervalAccessMonths}</span>
      </td>

      <td>
        <div className='form-check form-switch form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={plan.isActive}
            id='flexSwitchDefault'
            onChange={handlePlanStatusChange}
          />
        </div>
      </td>

      <td className='d-flex' style={{ minWidth: '150px' }}>
        <Tooltip content={'Editar'} rounded color='primary'>
          <Link href={`/plans/edit/${plan.id}`}>
            <span className='btn btn-icon btn-bg-light btn-active-color-primary btn-md me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </span>
          </Link>
        </Tooltip>
      </td>
    </tr>
  )
}

export default PlanTableRow
