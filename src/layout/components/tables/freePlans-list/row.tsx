import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { IPlan } from '../../../../domain/models/plan'
import { ITogglePlanStatusParams } from '../../../../domain/usecases/interfaces/plan/togglePlanStatus'
import { KTSVG } from '../../../../helpers'
import { Switch } from '../../inputs'

type FreePlanTableRowProps = {
  freePlan: IPlan
  togglePlanStatus: (params: ITogglePlanStatusParams) => void
  onDeleteFreePlan: (freePlanId: string) => void
}
const FreePlanTableRow = ({
  freePlan,
  togglePlanStatus,
  onDeleteFreePlan,
}: FreePlanTableRowProps) => {
  const handlePlanStatusChange = () => {
    togglePlanStatus({ id: String(freePlan.id) })
  }

  const handleDeleteFreePlan = () => {
    onDeleteFreePlan(String(freePlan.id))
  }
  return (
    <tr>
      <td className='ps-4' scope='row'>
        <span className='w-bold d-block fs-7'>{freePlan.name}</span>
      </td>

      <td className='ps-4' scope='row'>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {freePlan.description}
        </span>
      </td>
      <td className='ps-4' scope='row'>
        <span className='fw-bold d-block fs-7'>{freePlan.intervalAccess}</span>
      </td>

      <td>
        <Switch active={freePlan.isActive} setModalUpdate={handlePlanStatusChange} />
      </td>

      <td className='d-flex' style={{ minWidth: '50px' }}>
        <Tooltip content={'Editar'} rounded color='primary'>
          <Link href={`/freePlans/edit/${freePlan.id}`}>
            <span className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </span>
          </Link>
        </Tooltip>

        <Tooltip content={'Excluir'} rounded color='primary'>
          <button
            onClick={handleDeleteFreePlan}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}

export { FreePlanTableRow }
