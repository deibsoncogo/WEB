import Link from 'next/link'
import { IPartialPurchaseResponse } from '../../../../interfaces/api-response/purchasePartialResponse'

export function Row({ date, transactionId, totalPrice, status }: IPartialPurchaseResponse) {
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{date}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {transactionId}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
          {totalPrice}
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
