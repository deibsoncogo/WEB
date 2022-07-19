import { Row } from './row'

import { usePaginationType } from '../../../../application/hooks/usePagination'
import { Pagination } from '../../pagination/Pagination'

import { ICoupon } from '../../../../domain/models/coupon'
import { ItemNotFound } from '../../search/ItemNotFound'

type PlansTableProps = {
  coupons: ICoupon[]
  paginationHook: usePaginationType
  toggleCouponStatus: (id: string) => void
}

type HandleClassesParam = {
  title: string
  extraClasses?: string
}

export function CouponsTable({ coupons, paginationHook, toggleCouponStatus }: PlansTableProps) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = ({ title, extraClasses = '' }: HandleClassesParam) => {
    return `text-dark ps-4 rounded-start cursor-pointer cursor-pointer align-middle min-w-150px ${extraClasses} ${getClassToCurrentOrderColumn(
      title
    )}`
  }

  console.log(coupons)

  return (
    <>
      {coupons.length > 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive w-100'>
              <table className='table gs-0 gy-4 w-100'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light '>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({ title: 'name' })}
                      onClick={() => handleOrdenation('name')}
                    >
                      Código
                    </th>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({ title: 'value' })}
                      onClick={() => handleOrdenation('value')}
                    >
                      Porcentagem
                    </th>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({ title: 'price' })}
                      onClick={() => handleOrdenation('price')}
                    >
                      Valor
                    </th>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({
                        title: 'quantity',
                      })}
                      style={{ maxWidth: '130px' }}
                      onClick={() => handleOrdenation('quantity')}
                    >
                      Quantidade
                    </th>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({ title: 'expirationDate' })}
                      style={{ maxWidth: '130px' }}
                      onClick={() => handleOrdenation('expirationDate')}
                    >
                      Data de expiração
                    </th>
                    <th
                      className={getColumnHeaderClasses({ title: 'isActive' })}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Ativo
                    </th>
                    <th
                      className='text-dark rounded-end align-middle'
                      style={{ minWidth: '100px' }}
                    >
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody className='w-100'>
                  {coupons?.map((coupon) => (
                    <Row key={coupon.id} coupon={coupon} toggleCouponStatus={toggleCouponStatus} />
                  ))}
                </tbody>
              </table>

              {coupons.length === 0 && (
                <p className='text-center my-8 pt-2'>Nenhum plano encontrado</p>
              )}
            </div>
          </div>

          <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
            <Pagination paginationHook={paginationHook} />
          </div>
        </>
      )}

      {coupons.length === 0 && <ItemNotFound message='Nenhuma categoria encontrado' />}
    </>
  )
}
