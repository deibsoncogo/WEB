import Link from 'next/link'
import { formatDate, formatDateToUTC } from '../../../../helpers'
import { IPartialPurchaseResponse } from '../../../../interfaces/api-response/purchasePartialResponse'
import { maskedToMoney } from '../../../formatters/currenceFormatter'

type Props = {
  userId: string
}

export function Row({ date, transactionId, totalPrice, status, userId }: IPartialPurchaseResponse & Props) {  
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-black-50 d-block fs-7'>{formatDate(formatDateToUTC(date), 'DD/MM/YYYY')}</span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {transactionId}
        </span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {maskedToMoney(totalPrice)}
        </span>
      </td>
      <td>
        <span className='text-black-50 d-block fs-7 mw-200px text-overflow-custom'>
          {status}
        </span>
      </td>
      <td>
        <Link href={`/users/edit/${userId}/purchase/${transactionId}`}>
          Visualizar
        </Link>
      </td>
    </tr>
  )
}
