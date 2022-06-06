import { useState } from 'react'

import { Row } from './row'
import { Pagination } from '../../pagination/Pagination'
import { usePaginationType } from '../../../../application/hooks/usePagination'

type TrainingsTable = {
  trainings: ITrainings[]
  paginationHook: usePaginationType
}

export function TrainingsTable({ trainings, paginationHook }: TrainingsTable) {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-striped align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='text-dark ps-4 min-w-100px rounded-start'>Nome</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className='text-dark min-w-100px'>Preço</th>
                <th className='text-dark min-w-150px'>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className='text-dark min-w-100px'>Ativo</th>
                <th className='text-dark min-w-50px text-end rounded-end' />
              </tr>
            </thead>

            <tbody>
              {!loading &&
                trainings?.map((item) => (
                  <Row
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    teacher={item.teacher}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='ms-auto'>
        <Pagination paginationHook={paginationHook} />
      </div>
    </>
  )
}
