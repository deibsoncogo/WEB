import { ITransaction } from '../../../../domain/models/transaction'
import { Row } from './row'

type Props = {
  userId: string
  purchases: ITransaction[]
}

export function PurchasesTable({ userId, purchases }: Props) {
  const statusMap: { [key: string]: string } = {
    canceled: 'Cancelado',
    failed: 'Negado',
    paid: 'Pago',
    pending: 'Aguardando pagamento',
  }

  return (
    <div className='table-responsive border border-secondary mb-6'>
      <table className='table table-striped align-middle gs-2 gy-4 mb-0 custom'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer`}>Data</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Id da transação</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Total</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Status</th>
            <th className={`text-dark center rounded-end cursor-pointer`}>Ação</th>
          </tr>
        </thead>

        <tbody className='custom'>
          {purchases.length === 0 && (
            <tr>
              <td colSpan={5} className='text-center fs-7 pt-5 pb-8'>
                Nenhuma compra feita!
              </td>
            </tr>
          )}
          {purchases?.map((item: any) => {
            item.status = statusMap[item.status] || item.status
            return (<Row key={item.id} userId={userId} {...item} />)
          })}
        </tbody>
      </table>
    </div>
  )
}
