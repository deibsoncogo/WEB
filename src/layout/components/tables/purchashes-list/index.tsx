import { Dispatch, SetStateAction, useState } from 'react'
import { Row } from './row'
import { IPartialPurchaseResponse } from '../../../../interfaces/api-response/purchasePartialResponse'

type Props = {
  purchases: IPartialPurchaseResponse[]
}

export function PurchasesTable({ purchases }: Props) {

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  return (
    <div className='table-responsive border border-secondary mb-6'>
      <table className='table table-striped align-middle gs-0 gy-4'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer`}>Data</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Id da transação</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Total</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Status</th>
            <th className={`text-dark cursor-pointer`}>Ação</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            purchases?.map((item) => (
              <Row
                key={item.transactionId}
                date={item.date}
                transactionId={item.transactionId}
                totalPrice={item.totalPrice}
                status={item.status}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
