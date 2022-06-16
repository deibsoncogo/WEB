import { Dispatch, SetStateAction, useState } from 'react'
import { Row } from './row'
import { IPartialProductResponse } from '../../../../interfaces/api-response/productsPartialResponse'

type Props = {
  products: IPartialProductResponse[]
  setProducts: Dispatch<SetStateAction<IPartialProductResponse[]>>
}

export function ProductsTable({ products, setProducts }: Props) {

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  return (
    <div className='table-responsive border border-secondary mb-6'>
      <table className='table table-striped align-middle gs-0 gy-4'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className={`text-dark ps-4 min-w-300px rounded-start cursor-pointer`}>Produto</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Data de Expiração</th>
            <th className={`text-dark cursor-pointer`} />
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
                setProducts={setProducts}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}