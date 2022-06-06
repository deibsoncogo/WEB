import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { dateMask } from '../../../formatters/dateFormatter'
import { cpfMask } from '../../../formatters/cpfFormatter'
import { addressMask } from '../../../formatters/addressFormatter'
import { IGetAllUsers } from '../../../../domain/usecases/interfaces/user/getAllUsers'
import { IUserResponse } from '../../../../interfaces/api-response'
import { useEffect, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { MakeUserRow } from '../../../../application/factories/components/deleteModal-factory'
import { toast } from 'react-toastify'
import {
  IExportAllUsersParams,
  IExportAllUsersToXLSX,
  IExportAllUserToXLSXResponse,
} from '../../../../domain/usecases/interfaces/user/exportAllUsersToXLSX'
import { useRequest } from '../../../../application/hooks/useRequest'
import { getCurrentDate } from '../../../../helpers/getCurrentDate'

type Props = {
  getAllUsers: IGetAllUsers
  makeExportAllUserToXLSX: IExportAllUsersToXLSX
}

export default function UsersTable({ getAllUsers, makeExportAllUserToXLSX }: Props) {
  const [users, setUsers] = useState<IUserResponse[]>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')

  const {
    data: usersExportedSucessful,
    makeRequest: exportUsersToXlsx,
    loading: loadingExportUsersToXLSX,
    cleanUp: cleanUpExportUsers,
    error: errorExportUsersToXLSX,
  } = useRequest<IExportAllUserToXLSXResponse, IExportAllUsersParams>(
    makeExportAllUserToXLSX.export
  )

  const handleClickDownlondExcelClick = () => {
    exportUsersToXlsx({ name: userName })
  }

  useEffect(() => {
    getAllUsers
      .getAll()
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => toast.error(error.messages))
      .finally(() => setLoading(false))
  }, [])

  const refreshUsers = () => {
    setLoading(true)
    getAllUsers
      .getAll()
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => toast.error(error.messages))
      .finally(() => setLoading(false))
  }

  const onSearchTextChanged = (search: string): void => {
    console.log(search)
  }

  useEffect(() => {
    if (usersExportedSucessful) {
      const { type, data } = usersExportedSucessful
      const blob = new Blob([data], { type: type })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      const filename = `usuarios_${getCurrentDate()}.xlsx`
      link.download = filename
      link.click()
      cleanUpExportUsers()
    }
  }, [usersExportedSucessful])

  useEffect(() => {
    if (errorExportUsersToXLSX) {
      toast.error(errorExportUsersToXLSX)
    }
  }, [errorExportUsersToXLSX])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={onSearchTextChanged} />
        </h3>
        <div className='card-toolbar'>
          <Link href='/users/create'>
            <a className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Novo Usuário
            </a>
          </Link>
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
              {!loading &&
                users?.map((item) => (
                  <MakeUserRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    email={item.email}
                    birthDate={dateMask(item.birthDate)}
                    cpf={cpfMask(item.cpf)}
                    address={addressMask(item.address[0])}
                    refreshUsers={refreshUsers}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div className='d-flex justify-center align-items-center'>
          <p className='m-0 text-gray-600 lh-1 text-center'>Download:</p>
          <button
            className='btn border border-gray-900 ms-5 p-1'
            title='Exportar Exel'
            onClick={handleClickDownlondExcelClick}
          >
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
