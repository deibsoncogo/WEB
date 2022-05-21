import { useState } from 'react'
import { api } from '../../../../application/services/api'
import { KTSVG } from '../../../../helpers'
import { DeleteUserModal } from '../../modals/delete-user'

interface IRow {
  id: string
  name: string
  email: string
  birthDate: string
  cpf: string
  address: string
  deleteUser: IDeleteUser
}

export function Row({ id, name, email, birthDate, cpf, address, deleteUser }: IRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleDeleteUser() {
    try {
      const resp = await deleteUser.deleteUser()
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  function updatePassword() {}

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{email}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{birthDate}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{cpf}</span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{address}</span>
      </td>
      <td className='text-end'>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
        </button>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>

      <DeleteUserModal
        isOpen={isModalOpen}
        action={handleDeleteUser}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
      />
    </tr>
  )
}
