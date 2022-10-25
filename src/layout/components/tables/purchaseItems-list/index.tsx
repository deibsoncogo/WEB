import { useState } from 'react'
import { Product } from '../../../../domain/models/product'
import { ITransactionProduct } from '../../../../domain/models/transactionPagarMe'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { ItemRow } from './row'

type Props = {
  items: ITransactionProduct[]
}

export function PurchaseItems({ items = [] }: Props) {
  return (
    <>
      <table className='table align-middle gs-0 gy-4 mb-10'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Produto</th>
            <th className='text-dark ps-4 min-w-100px cursor-pointer'>Preço</th>
            <th className='text-dark ps-4 min-w-100px cursor-pointer'>Quantidade</th>
            <th className='text-dark ps-4 min-w-100px rounded-end cursor-pointer'>Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <ItemRow
              key={index}
              name={item.name}
              price={item.amount}
              quantity={item.quantity}
              total={item.total}
            />
          ))}
        </tbody>
      </table>
      <div>
        <span className='d-flex align-items-center gap-2 fw-bolder fs-4'>
          Total do Pedido:
          <span className='text-black-50 fs-4 fw-light'>
            {maskedToMoney(items?.reduce((acc, currentItem) => acc + currentItem.total, 0))}
          </span>
        </span>
      </div>
    </>
  )
}
