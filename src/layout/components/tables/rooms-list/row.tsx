import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IDeleteRoom } from '../../../../domain/usecases/interfaces/room/deleteRoom'
import { IToggleRoomStatus } from '../../../../domain/usecases/interfaces/room/toggleRoomStatus'
import { KTSVG } from '../../../../helpers'
import { Switch } from '../../inputs/switch'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  teacher: string
  isActive: boolean
  belongsToPlans: boolean
  isChatActive: boolean
  toggleStatus: IToggleRoomStatus
  deleteRoom: IDeleteRoom
  handleRefresher: () => void
  isAdmin: boolean
}

export function Row({
  id,
  name,
  description,
  price,
  teacher,
  isActive,
  belongsToPlans,
  isChatActive,
  toggleStatus,
  deleteRoom,
  handleRefresher,
  isAdmin,
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDeleteRoom() {
    try {
      setLoading(true)
      await deleteRoom.delete(id)
      setIsModalDeleteOpen(false)
      toast.success('Sala excluída com sucesso!')
      handleRefresher()
    } catch {
      toast.error('Não foi possível excluir a sala!')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateRoom() {
    try {
      setLoading(true)

      await toggleStatus.toggle({ id })
      setIsModalUpdateOpen(false)
      toast.success(`Sala ${!isActive ? 'ativada' : 'desativada'} com sucesso!`)
      handleRefresher()
    } catch (err) {
      toast.error('Não foi possível atualizar a sala!')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
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
          {isChatActive && (
            <Tooltip content={'Chat'} rounded color='primary'>
              <Link href={`/rooms/chat/${id}`}>
                <button className='btn btn-icon btn-active-color-primary btn-sm me-1'>
                  <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
                </button>
              </Link>
            </Tooltip>
          )}
        </td>
        <td>
          <Switch active={isActive} setModalUpdate={setIsModalUpdateOpen} />
        </td>

        <td className='text-end d-flex justify-content-end px-4'>
          <Tooltip content={'Editar'} rounded color='primary'>
            <Link href={`/rooms/edit/${id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>

          {isAdmin && (
            <Tooltip
              content={
                belongsToPlans ? 'Não é possível excluir, pois pertence a um plano' : 'Excluir'
              }
              rounded
              color='primary'
            >
              <button
                onClick={
                  belongsToPlans
                    ? undefined
                    : () => {
                        setIsModalDeleteOpen(true)
                      }
                }
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              >
                <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
              </button>
            </Tooltip>
          )}
        </td>

        <ConfirmationModal
          isOpen={isModalDeleteOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalDeleteOpen(false)
          }}
          onConfimation={handleDeleteRoom}
          content='Você tem ceterza que deseja excluir esta sala?'
          title='Excluir'
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
    </>
  )
}
