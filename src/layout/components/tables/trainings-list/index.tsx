import { useState } from 'react'
import Link from 'next/link'

import { Row } from './row'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'

export function TrainingsTable() {
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [trainings, setTrainings] = useState([
    {
      id: '1',
      name: 'Análises Diárias',
      description: 'Análises completas feitas todos os dias',
      price: 84.5,
      teacher: 'Palex',
      isActive: true,
    },
    {
      id: '2',
      name: 'trainings',
      description: 'trainings',
      price: '1',
      teacher: 'trainings',
      isActive: false,
    },
  ])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={() => null} />
        </h3>
        <div className='card-toolbar'>
          <Link href='/trainings/create'>
            <a className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Novo Treinamento
            </a>
          </Link>
        </div>
      </div>

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

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div />

        <div className='card-toolbar'>
          <ul className='pagination'>
            <li className='page-item previous disabled'>
              <a href='#' className='page-link'>
                <i className='previous'></i>
              </a>
            </li>
            <li className='page-item'>
              <a href='#' className='page-link'>
                1
              </a>
            </li>
            <li className='page-item active'>
              <a href='#' className='page-link'>
                2
              </a>
            </li>
            <li className='page-item'>
              <a href='#' className='page-link'>
                3
              </a>
            </li>
            <li className='page-item next'>
              <a href='#' className='page-link'>
                <i className='next'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
