import { Tooltip } from '@nextui-org/react'
import { KTSVG } from '../../../../helpers'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'

export function Row({ id, name, expireDate }: IPartialProductResponse) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {expireDate}
        </span>
      </td>
      <td>
        <Tooltip content={'Deletar'} rounded color='primary'>
          <button
            onClick={() => {}}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}
