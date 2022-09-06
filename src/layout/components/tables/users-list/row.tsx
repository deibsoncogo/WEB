import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { IDeleteUserParams } from '../../../../domain/usecases/interfaces/user/deleteUser'
import { KTSVG } from '../../../../helpers'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  email: string
  birthDate: string
  cpf: string
  address: string
  loading: boolean
  deleteUser: (params: IDeleteUserParams) => void
  openResetUserPasswordModal: (userId: string) => void
}

export function Row({
  id,
  name,
  email,
  birthDate,
  cpf,
  address,
  loading,
  deleteUser,
  openResetUserPasswordModal,
}: IRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleDeleteUser() {
    deleteUser({ id })
  }

  const handleClickResetPassword = () => {
    openResetUserPasswordModal(id)
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{email}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{birthDate}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{cpf}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{address}</span>
      </td>
      <td className='d-flex'>
        <Tooltip content={'Editar'} rounded color='primary'>
          <Link href={`/users/edit/${id}`}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>

        <Tooltip content={'Excluir'} rounded color='primary'>
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
        <Tooltip
          content={'Alterar Senha'}
          rounded
          color='primary'
          onClick={handleClickResetPassword}
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/icons/key.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>

      <ConfirmationModal
        isOpen={isModalOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
        onConfimation={handleDeleteUser}
        content='Você tem certeza que deseja excluir este usuário?'
        title='Deletar'
      />
    </tr>
  )
}
