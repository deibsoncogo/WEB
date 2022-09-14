import { Dispatch, SetStateAction, useState } from 'react'
import { Row } from './row'
import { GrantedProduct } from '../../../../domain/models/grantedProduct'

type Props = {
  grantedProducts: GrantedProduct[]
  setGrantedProducts: Dispatch<SetStateAction<GrantedProduct[]>>
}

export function ProductsTable({ grantedProducts, setGrantedProducts }: Props) {
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  return (
    <div className='table-responsive border border-secondary mb-6'>
      <table className='table table-striped align-middle gs-0 gy-4 mb-0'>
        <thead>
          <tr className='fw-bolder text-muted bg-light'>
            <th className={`text-dark ps-4 min-w-300px rounded-start cursor-pointer`}>Produto</th>
            <th className={`text-dark min-w-100px cursor-pointer`}>Data de Expiração</th>
            <th className={`text-dark rounded-end cursor-pointer`}>Ação</th>
          </tr>
        </thead>

        <tbody>
          {grantedProducts.length === 0 && (
            <tr>
              <td colSpan={3} className='text-center fs-7 pt-5 pb-8'>
                Nenhum produto foi concedido!
              </td>
            </tr>
          )}
          {!loading &&
            grantedProducts?.map((item) => (
              <Row
                key={item.productId}
                id={item.productId}
                name={item.product.name}
                expireDate={item.expireDate}
                setGrantedProducts={setGrantedProducts}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
