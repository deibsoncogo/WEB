import { Row } from './row'

import { usePaginationType } from '../../../../application/hooks/usePagination'
import { Pagination } from '../../pagination/Pagination'

import { ICoupon } from '../../../../domain/models/coupon'
import { ItemNotFound } from '../../search/ItemNotFound'

type PlansTableProps = {
  coupons: ICoupon[]
  paginationHook: usePaginationType
  toggleCouponStatus: (id: string) => void
  deleteCoupon: (id: string) => void
  selectCouponToBeEdited: (coupon: ICoupon) => void
}

type HandleClassesParam = {
  title: string
  extraClasses?: string
}

export function CouponsTable({
  coupons,
  paginationHook,
  toggleCouponStatus,
  deleteCoupon,
  selectCouponToBeEdited,
}: PlansTableProps) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = ({ title, extraClasses = '' }: HandleClassesParam) => {
    return `text-dark ps-4 cursor-pointer cursor-pointer align-middle min-w-150px ${extraClasses} ${getClassToCurrentOrderColumn(
      title
    )}`
  }

  return (
    <>
      {coupons.length > 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive w-100'>
              <table className='table gs-2 gy-4 w-100'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light '>
                    <th
                      role='columnheader'
                      scope='col'
                      className={getColumnHeaderClasses({ title: 'name' }) + ' rounded-start'}
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
                      className={getColumnHeaderClasses({ title: 'value' })}
                      onClick={() => handleOrdenation('value')}
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
                      Data de Expiração
                    </th>
                    <th
                      className={getColumnHeaderClasses({ title: 'isActive' })}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Ativo
                    </th>
                    <th
                      className='text-dark text-end rounded-end align-middle'
                      style={{ minWidth: '100px', paddingRight: '3rem' }}
                    >
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody className='w-100'>
                  {coupons?.map((coupon) => (
                    <Row
                      key={coupon.id}
                      coupon={coupon}
                      toggleCouponStatus={toggleCouponStatus}
                      deleteCoupon={deleteCoupon}
                      selectCouponToBeEdited={selectCouponToBeEdited}
                    />
                  ))}
                </tbody>
              </table>

              {coupons.length === 0 && (
                <p className='text-center my-8 pt-2'>Nenhum cupom encontrado</p>
              )}
            </div>
          </div>

          <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
            <Pagination paginationHook={paginationHook} />
          </div>
        </>
      )}

      {coupons.length === 0 && <ItemNotFound message='Nenhum cupom encontrado' />}
    </>
  )
}
