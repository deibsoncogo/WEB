import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { KTSVG } from '../../../../helpers'
import { IDeleteRoom } from '../../../../domain/usecases/interfaces/room/deleteRoom'
import ConfirmationModal from '../../modal/ConfirmationModal'
import { Switch } from '../../inputs/switch'
import { Tooltip } from '@nextui-org/react'
import { IGetRoom } from '../../../../domain/usecases/interfaces/room/getCourse'
import { IUpdateRoom } from '../../../../domain/usecases/interfaces/room/updateRoom'
import { UpdateRoom } from '../../../../domain/models/updateRoom'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  teacher: string
  isActive: boolean
  updateRoom: IUpdateRoom
  deleteRoom: IDeleteRoom
  handleRefresher: () => void
}

export function Row({
  id,
  name,
  description,
  price,
  teacher,
  isActive,
  updateRoom,
  deleteRoom,
  handleRefresher,
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDeleteRoom() {
    try {
      setLoading(true)
      await deleteRoom.delete(id)
      setIsModalDeleteOpen(false)
      toast.success('Sala deletada com sucesso.')
      handleRefresher()
    } catch {
      toast.error('Não foi possível deletar a sala.')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateRoom() {
    try {
      setLoading(true)      
      const form = new FormData()
      form.append('room', JSON.stringify({id: id, isActive: !isActive}))
      await updateRoom.update(form)
      setIsModalUpdateOpen(false)
      toast.success('Sala atualizada com sucesso.')
      handleRefresher()
    } catch (err) {
      toast.error('Não foi possível atualizar a sala.')
    } finally {
      setLoading(false)
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
        <Tooltip content={'Chat'} rounded color='primary'>
          <Link href={`/rooms/chat/${id}`}>
            <button className='btn btn-icon btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>
      </td>
      <td>
        <Switch active={isActive} setModalUpdate={setIsModalUpdateOpen} />
      </td>

      <td className='text-end d-flex justify-content-start px-4'>
        <Tooltip content={'Editar'} rounded color='primary'>
          <Link href={`/rooms/edit/${id}`}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>

        <Tooltip content={'Deletar'} rounded color='primary'>
          <button
            onClick={() => {
              setIsModalDeleteOpen(true)
            }}
            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
          >
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>

      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalDeleteOpen(false)
        }}
        onConfimation={handleDeleteRoom}
        content='Você tem ceterza que deseja excluir esta sala?'
        title='Deletar'
      />

      <ConfirmationModal
        isOpen={isModalUpdateOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalUpdateOpen(false)
        }}
        onConfimation={handleUpdateRoom}
        content='Você tem certeza que deseja alterar o status desta sala?'
        title='Confirmação'
      />
    </tr>
  )
}
