import Link from 'next/link'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'

export function Row({ id, name, expireDate }: IPartialProductResponse) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span
          className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
        >
          {expireDate}
        </span>
      </td>
    </tr>
  )
}
