import Link from 'next/link'
import { ITransaction } from '../../../../domain/models/transaction'
import { formatDate, formatDateToUTC } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

type Props = {
  userId: string
}

export function Row({ createdAt, id, pagarMeId, cart, status, userId }: ITransaction & Props) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-black-50 d-block fs-7'>
          {formatDate(formatDateToUTC(String(createdAt)), 'DD/MM/YYYY')}
        </span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {pagarMeId}
        </span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {maskedToMoney(cart?.total)}
        </span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>{status}</span>
      </td>
      <td className='d-flex'>
        <Link href={`/users/edit/${userId}/purchase/${id}`}>
          <a className='btn btn-link btn-sm'>Visualizar</a>
        </Link>
      </td>
    </tr>
  )
}
