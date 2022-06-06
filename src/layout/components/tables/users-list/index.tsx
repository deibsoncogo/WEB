import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { dateMask } from '../../../formatters/dateFormatter'
import { cpfMask } from '../../../formatters/cpfFormatter'
import { addressMask } from '../../../formatters/addressFormatter'
import {
  IGetAllUsers,
  IGetAllUsersParams,
} from '../../../../domain/usecases/interfaces/user/getAllUsers'
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
import { Loading } from '../../loading/loading'
import { OutputPagination } from '../../../../domain/shared/interface/OutputPagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Pagination } from '../../pagination/Pagination'
import {
  IDeleteUser,
  IDeleteUserParams,
} from '../../../../domain/usecases/interfaces/user/deleteUser'
import { FullLoading } from '../../FullLoading/FullLoading'
import { debounce } from '../../../../helpers/debounce'

type Props = {
  getAllUsers: IGetAllUsers
  makeExportAllUserToXLSX: IExportAllUsersToXLSX
  makeDeleteUser: IDeleteUser
}

export default function UsersTable({
  getAllUsers,
  makeExportAllUserToXLSX,
  makeDeleteUser,
}: Props) {
  const [userName, setUserName] = useState('')
  const [users, setUsers] = useState<IUserResponse[]>([])

  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook
  const { take, currentPage, order } = pagination
  const paginationParams: IGetAllUsersParams = {
    page: currentPage,
    take,
    name: userName,
    order,
    orderBy: pagination.orderBy,
  }

  const {
    data: paginatedUsers,
    makeRequest: getAllUserPaginated,
    loading: loadingGetAllUsers,
  } = useRequest<OutputPagination<IUserResponse>>(getAllUsers.getAll)

  const {
    data: usersExportedSucessful,
    makeRequest: exportUsersToXlsx,
    loading: loadingExportUsersToXLSX,
    cleanUp: cleanUpExportUsers,
    error: errorExportUsersToXLSX,
  } = useRequest<IExportAllUserToXLSXResponse, IExportAllUsersParams>(
    makeExportAllUserToXLSX.export
  )

  const {
    makeRequest: deleteUser,
    data: userDeletedSuccessful,
    error: errorDeleteUser,
    loading: loadingUserDeletion,
    cleanError: cleanUpDeleteUser,
  } = useRequest<string, IDeleteUserParams>(makeDeleteUser.deleteUser)

  const handleClickDownlondExcelClick = () => {
    exportUsersToXlsx(paginationParams)
  }

  const onSearchTextChanged = debounce((search: string): void => {
    setUserName(search)
  })

  const getColumnHeaderClasses = (name: string) => {
    return `text-dark ps-4 min-w-100px rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  useEffect(() => {
    getAllUserPaginated(paginationParams)
  }, [pagination.take, pagination.currentPage, pagination.order, userName, userDeletedSuccessful])

  useEffect(() => {
    if (paginatedUsers) {
      const { data, total } = paginatedUsers
      setUsers(data)
      setTotalPage(total)
    }
  }, [paginatedUsers])

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

    if (errorDeleteUser) {
      toast.error(errorDeleteUser)
    }
  }, [errorExportUsersToXLSX, errorDeleteUser])

  useEffect(() => {
    if (userDeletedSuccessful) {
      toast.success('Usuário deletado com sucesso')
      cleanUpDeleteUser()
    }
  }, [userDeletedSuccessful])

  const loading = loadingExportUsersToXLSX || loadingGetAllUsers

  return (
    <div className='card mb-5 mb-xl-8'>
      {loading && <FullLoading />}
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
                <th
                  className={getColumnHeaderClasses('name')}
                  onClick={() => handleOrdenation('name')}
                >
                  Nome
                </th>
                <th
                  className={getColumnHeaderClasses('email')}
                  onClick={() => handleOrdenation('email')}
                >
                  Email
                </th>
                <th
                  className={getColumnHeaderClasses('birthDate')}
                  onClick={() => handleOrdenation('birthDate')}
                >
                  Nascimento
                </th>
                <th
                  className={getColumnHeaderClasses('cpf')}
                  onClick={() => handleOrdenation('cpf')}
                >
                  CPF
                </th>
                <th
                  className={getColumnHeaderClasses('address')}
                  onClick={() => handleOrdenation('address')}
                >
                  Endereço
                </th>
                <th className='text-dark min-w-150px text-end rounded-end px-4'>Ação</th>
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
                    deleteUser={deleteUser}
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

        <Pagination paginationHook={paginationHook} />
      </div>
    </div>
  )
}
