import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { KTSVG } from '../../../../helpers'
import { ActionModal } from '../../modals/action'
import { Room } from '../../../../interfaces/model/Room'

export function Row({ id, name, description, price, teacher, isActive }: Room) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(isActive)

  async function handleChangeStatus() {
    try {      
      setIsStatusModalOpen(false)
      setIsChecked(!isChecked)
      toast.success('Status alterado com sucesso!')      
    } catch (err: any) {
      toast.error(err.messages[0])
    }
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span
          className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'
          title={description}
        >
          {description}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{price}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{teacher}</span>
      </td>
      <td>
        <Link href={`/rooms/chat/${id}`}>
          <button className='btn btn-icon btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
          </button>
        </Link>
      </td>
      <td>
        <div className='form-check form-switch form-check-custom form-check-solid'>
          <input className='form-check-input' type='checkbox' value='' id='flexSwitchDefault' checked={isChecked}
            onClick={() => {setIsStatusModalOpen(true)}}/>
        </div>
      </td>

      <td>
        <Link href={`/rooms/edit/${id}`}>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Link>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>

      <ActionModal
        isOpen={isStatusModalOpen}
        modalTitle = "Status"
        message = "Você tem certeza que deseja alterar o status dessa sala?"
        action={handleChangeStatus}
        onRequestClose={() => {
          setIsStatusModalOpen(false)
        }}
      />
    </tr>
  )
}
