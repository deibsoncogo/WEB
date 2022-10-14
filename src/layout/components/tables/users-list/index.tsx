import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { RiFileExcel2Line } from 'react-icons/ri'

import { useRequest } from '../../../../application/hooks/useRequest'
import { usePagination } from '../../../../application/hooks/usePagination'
import { MakeUserRow } from '../../../../application/factories/components/deleteModal-factory'

import { KTSVG } from '../../../../helpers'
import { debounce } from '../../../../helpers/debounce'
import { cpfMask } from '../../../formatters/cpfFormatter'
import { dateMask } from '../../../formatters/dateFormatter'
import { addressMask } from '../../../formatters/addressFormatter'
import { getCurrentDate } from '../../../../helpers/getCurrentDate'
import { IResetPassowrdForm, ResetPasswordModal } from '../../modal/ResetPasswordModal'

import { Search } from '../../search/Search'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Pagination } from '../../pagination/Pagination'

import {
  IDeleteUser,
  IDeleteUserParams,
} from '../../../../domain/usecases/interfaces/user/deleteUser'
import {
  IGetAllUsers,
  IGetAllUsersParams,
} from '../../../../domain/usecases/interfaces/user/getAllUsers'
import {
  IResetUserPassword,
  IResetUserPasswordParams,
} from '../../../../domain/usecases/interfaces/user/resetUserPassword'
import {
  IExportAllUsersParams,
  IExportAllUsersToXLSX,
  IExportAllUserToXLSXResponse,
} from '../../../../domain/usecases/interfaces/user/exportAllUsersToXLSX'
import { IUserResponse } from '../../../../interfaces/api-response'
import { OutputPagination } from '../../../../domain/shared/interface/OutputPagination'

type Props = {
  getAllUsers: IGetAllUsers
  makeExportAllUserToXLSX: IExportAllUsersToXLSX
  makeDeleteUser: IDeleteUser
  makeResetPassword: IResetUserPassword
}

type ResetPasswordModalState = {
  isOpen: boolean
  userId: string | null
}

export function UsersTable({
  getAllUsers,
  makeExportAllUserToXLSX,
  makeDeleteUser,
  makeResetPassword,
}: Props) {
  const [userName, setUserName] = useState('')
  const [users, setUsers] = useState<IUserResponse[]>([])
  const [resetPasswordModalState, setResetPasswordModalState] = useState<ResetPasswordModalState>({
    isOpen: false,
    userId: null,
  })

  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const paginationParams: IGetAllUsersParams = {
    take: pagination.take,
    order: pagination.order,
    orderBy: pagination.orderBy,
    page: pagination.currentPage,
    name: userName,
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

  const {
    makeRequest: resetUserPassword,
    data: resetUserPasswordSuccessful,
    error: errorResetUserPassword,
    loading: resetUserPasswordLoading,
    cleanUp: cleanUpResetUserPassword,
  } = useRequest<string, IResetUserPasswordParams>(makeResetPassword.resetPassword)

  const handleClickDownlondExcelClick = () => {
    exportUsersToXlsx(paginationParams)
  }

  const onSearchTextChanged = debounce((search: string): void => {
    setUserName(search)
  })

  const getColumnHeaderClasses = (name: string) => {
    return `text-dark ps-4 min-w-100px cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  const handleOpenResetPasswordModal = (userId: string) => {
    setResetPasswordModalState({ isOpen: true, userId })
  }

  const handleCloseResetUserPasswordModal = () => {
    setResetPasswordModalState({ isOpen: false, userId: null })
  }

  const handleResetUserPassword = (params: IResetPassowrdForm) => {
    if (resetPasswordModalState.userId) {
      resetUserPassword({ ...params, id: resetPasswordModalState.userId })
    }
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
    if (errorExportUsersToXLSX) {
      toast.error(errorExportUsersToXLSX + '!')
    }

    if (errorDeleteUser) {
      toast.error(errorDeleteUser + '!')
    }

    if (errorResetUserPassword) {
      toast.error(errorResetUserPassword + '!')
    }
  }, [errorExportUsersToXLSX, errorDeleteUser, errorResetUserPassword])

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

    if (userDeletedSuccessful) {
      toast.success('Usuário excluído com sucesso!')
      cleanUpDeleteUser()
    }

    if (resetUserPasswordSuccessful) {
      toast.success('Senha atualizada com sucesso!')
      cleanUpResetUserPassword()
      handleCloseResetUserPasswordModal()
    }
  }, [usersExportedSucessful, userDeletedSuccessful, resetUserPasswordSuccessful])

  const loading = loadingExportUsersToXLSX || loadingGetAllUsers || loadingUserDeletion

  return (
    <>
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

        {users.length !== 0 && (
          <>
            <div className='card-body py-3'>
              <div className='table-responsive'>
                <table className='table align-middle gs-2 gy-4'>
                  <thead>
                    <tr className='fw-bolder text-muted bg-light'>
                      <th
                        className={getColumnHeaderClasses('name') + ' rounded-start'}
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
                      <th className={getColumnHeaderClasses('actions') + ' rounded-end text-end'}>
                        Ação
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((item) => (
                      <MakeUserRow
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        email={item.email}
                        birthDate={dateMask(item.birthDate)}
                        cpf={cpfMask(item.cpf)}
                        address={addressMask(item.address[0])}
                        loading={loadingUserDeletion}
                        deleteUser={deleteUser}
                        openResetUserPasswordModal={handleOpenResetPasswordModal}
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
          </>
        )}

        {users.length === 0 && !loading && <ItemNotFound message='Nenhum usuário encontrado' />}
      </div>

      <ResetPasswordModal
        isOpen={resetPasswordModalState.isOpen}
        resetPassword={handleResetUserPassword}
        onRequestClose={handleCloseResetUserPasswordModal}
        loading={resetUserPasswordLoading}
      />
    </>
  )
}
