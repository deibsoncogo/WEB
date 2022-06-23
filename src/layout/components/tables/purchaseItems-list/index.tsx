import { useState } from "react";
import { maskedToMoney } from "../../../formatters/currenceFormatter";
import { ItemRow } from "./row";

export function PurchaseItems() {

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Day Trade - Do básico ao avançado',
      price: 1000,
      quantity: 10,
      total: 10000
    }
  ])

  return (
    <>
      <table className='table align-middle gs-0 gy-4 mb-10'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Produto</th>
            <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Preço</th>
            <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Quantidade</th>
            <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Total</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            items.map((item) => (
              <ItemRow key={item.id} name={item.name} price={item.price} quantity={item.quantity} total={item.total} />
            ))}
        </tbody>
      </table>
      <div>
        <span className='d-flex align-items-center gap-2 fw-bolder fs-4'>
          Total do Pedido: 
          <span className='text-black-50 fs-4 fw-light'>
            {maskedToMoney(items.reduce((acc, currentItem) => acc + currentItem.total, 0))}
          </span>
        </span>
      </div>
    </>
  )
}
