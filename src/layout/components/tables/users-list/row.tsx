import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../application/services/api'
import { KTSVG } from '../../../../helpers'
import { ActionModal } from '../../modals/action'

import { Tooltip} from "@nextui-org/react";

interface IRow {
  id: string
  name: string
  email: string
  birthDate: string
  cpf: string
  address: string
  deleteUser: IDeleteUser
  refreshUsers: () => void
}

export function Row({ id, name, email, birthDate, cpf, address, deleteUser, refreshUsers }: IRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleDeleteUser() {
    try {
      const resp = await deleteUser.deleteUser()
      setIsModalOpen(false)
      toast.success('Usuário deletado com sucesso!')
      refreshUsers()
    } catch (err: any) {
      toast.error(err.messages[0])
    }
  }

  function updatePassword() {}

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
      <td className='text-end'>
        <Tooltip content={'Alterar Senha'} rounded css={{ color: '$customColor' }}>
          <Link href={"/reset-password"}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>
        <Tooltip content={'Editar'} rounded css={{ color: '$customColor' }}>
          <Link href={`/users/edit/${id}`}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>

        <Tooltip content={'Deletar'} rounded css={{ color: '$customColor' }}>
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>

      <ActionModal
        isOpen={isModalOpen}
        modalTitle='Deletar'
        message='Você tem certeza que deseja excluir esse usuário?'
        action={handleDeleteUser}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
      />
    </tr>
  )
}
