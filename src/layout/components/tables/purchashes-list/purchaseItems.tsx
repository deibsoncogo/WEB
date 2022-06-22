import { useState } from "react";
import { ItemRow } from "./itemRow";

export function PurchaseItems() {

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Day Trade - Do básico ao avançado',
      price: '100',
      quantity: '10',
      total: '1000'
    }
  ])

  return (
    <table className='table align-middle gs-0 gy-4'>
      <thead>
        <tr className='fw-bolder text-muted bg-light'>
          <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Produto</th>
          <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Preço</th>
          <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Quantidade</th>
          <th className='text-dark ps-4 min-w-100px rounded-start cursor-pointer'>Total</th>
        </tr>
      </thead>
      <tbody>
        {/* map the items */}
        {!loading &&
          items.map((item) => (
            <ItemRow key={item.id} name={item.name} price={item.price} quantity={item.quantity} total={item.total} />
          ))}
      </tbody>
    </table>
  )
}
