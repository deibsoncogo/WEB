import { RiFileExcel2Line } from 'react-icons/ri'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { Row } from './row'

export function UsersTable() {
  const fakeArray = [
    {
      id: '1',
      name: 'Victor Vaconcelos',
      email: 'victor.vasconcelos@luby.software',
      birthDate: '01/09/2002',
      cpf: '000.000.000-00',
      address: 'Rua Ficticia',
    },
    {
      id: '2',
      name: 'Ricardo Mendonça',
      email: 'ricardo.mendonça@gmail.com',
      birthDate: '01/09/2002',
      cpf: '000.000.000-00',
      address: 'Rua Ficticia',
    },
    {
      id: '3',
      name: 'Cleber Machado',
      email: 'cleber.machado@hotmal.com',
      birthDate: '01/09/2002',
      cpf: '000.000.000-00',
      address: 'Rua Ficticia',
    },
  ]

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search />
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Novo Usuário
          </a>
        </div>
      </div>

      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='text-dark ps-4 min-w-100px rounded-start'>Nome</th>
                <th className='text-dark min-w-100px'>Email</th>
                <th className='text-dark min-w-100px'>Nascimento</th>
                <th className='text-dark min-w-150px'>CPF</th>
                <th className='text-dark min-w-100px'>Endereço</th>
                <th className='text-dark min-w-150px text-end rounded-end' />
              </tr>
            </thead>

            <tbody>
              {fakeArray.length !== 0 &&
                fakeArray.map((item) => (
                  <Row
                    key={item.id}
                    name={item.name}
                    email={item.email}
                    birthDate={item.birthDate}
                    cpf={item.cpf}
                    address={item.address}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div className='d-flex justify-center align-center'>
          <p className='m-0 text-gray-600 lh-1 text-center'>Download:</p>
          <button className='btn border border-gray-900 ms-5 p-1' title='Exportar Exel'>
            <RiFileExcel2Line size={20} className='svg-icon-2 mh-50px' />
          </button>
        </div>

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
