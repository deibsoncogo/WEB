import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Row } from './row'

export function ProductsTable() {

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Boletim Diário',
      expireDate: '26/10/2022'
    },
    {
      id: '2',
      name: 'Planilhas',
      expireDate: '26/10/2022'
    },
  ])

  return (
    <div className='table-responsive border border-secondary mb-6'>
      <table className='table table-striped align-middle gs-0 gy-4'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer`}>Produto</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Data de Expiração</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            products?.map((item) => (
              <Row
                key={item.id}
                id={item.id}
                name={item.name}
                expireDate={item.expireDate}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
