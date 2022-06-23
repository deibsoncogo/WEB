import Link from 'next/link'
import { formatDate, formatDateToUTC } from '../../../../helpers'
import { IPartialPurchaseResponse } from '../../../../interfaces/api-response/purchasePartialResponse'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

export function Row({ date, transactionId, totalPrice, status }: IPartialPurchaseResponse) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{formatDate(formatDateToUTC(date), 'DD/MM/YYYY')}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {transactionId}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {maskedToMoney(totalPrice)}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {status}
        </span>
      </td>
      <td>
        <Link href={`/purchase/${transactionId}`}>
          Visualizar
        </Link>
      </td>
    </tr>
  )
}
