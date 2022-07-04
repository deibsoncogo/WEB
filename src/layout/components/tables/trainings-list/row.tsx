import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

import { toast } from 'react-toastify'
import { ConflitctEntitiesError } from '../../../../domain/errors/conflict-entities-error'
import { IToggleTrainingStatus } from '../../../../domain/usecases/interfaces/trainings/toggleTrainingStatus'
import { KTSVG } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { Switch } from '../../inputs'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  teacherName: string
  active: boolean
  deleteTraining: IDeleteTraining
  updateStatusOfTraining: IUpdateTraining
  getTrainings(): Promise<void>
  remoteToggleTrainingStatus: IToggleTrainingStatus
  handleRefresher: () => void
}

export function Row({
  id,
  name,
  description,
  price,
  teacherName,
  active,
  deleteTraining,
  remoteToggleTrainingStatus,
  updateStatusOfTraining,
  getTrainings,
  handleRefresher,
}: IRow) {
  const [loading, setLoading] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

  async function handleDeleteTraining() {
    setLoading(true)
    try {
      setLoading(true)
      await deleteTraining.deleteTraining()
      getTrainings()
      toast.success('Treinamento excluído com sucesso')
    } catch (err) {
      if (err instanceof ConflitctEntitiesError) {
        toast.error('Existem produtos vinculados a este treinamento')
        return
      }
      toast.error('Erro ao deletar o treinamento Treinamento')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleTrainingStatus() {
    try {
      setLoading(true)
      await remoteToggleTrainingStatus.toggle({ id })
      getTrainings()
      toast.success('Status do treinamento atualizado com sucesso.')
    } catch {
      toast.error('Error ao alterar o status do treinamento')
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }

  async function handleUpdateStatusOfTraining() {
    setLoading(true)

    const form = new FormData()
    form.append('id', id)
    form.append('active', !active === true ? 'true' : 'false')

    try {
      await updateStatusOfTraining.update(form)
      handleRefresher()
      toast.success('Status atualizado com sucesso')
    } catch (err) {
      toast.error('Erro ao atualizar o treinamento Treinamento')
    }
    setIsModalUpdateOpen(false)
    setLoading(false)
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
        <span className='text-dark fw-bold d-block fs-7'>{maskedToMoney(price)}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{teacherName}</span>
      </td>
      <td>
        <Tooltip content='Chat' rounded color='primary'>
          <Link href={`/trainings/chat/${id}`}>
            {active ? (
              <button className='btn btn-icon  btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/com003.svg' className='svg-icon-3 svg-icon-primary' />
              </button>
            ) : (
              <button className='btn btn-icon btn-active-color-primary btn-sm me-1' disabled>
                <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
              </button>
            )}
          </Link>
        </Tooltip>
      </td>

      <td>
        <Switch active={active} setModalUpdate={handleToggleTrainingStatus} />
      </td>

      <td className='text-end d-flex justify-content-start px-4'>
        <Tooltip content='Editar' rounded color='primary'>
          <Link href={`/trainings/edit/${id}`}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>

        <Tooltip
          content='Deletar'
          rounded
          color='primary'
          onClick={() => {
            setIsDeleteCategoryModalOpen(true)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>

      <ConfirmationModal
        isOpen={isDeleteCategoryModalOpen}
        loading={loading}
        onRequestClose={() => {
          setIsDeleteCategoryModalOpen(false)
        }}
        onConfimation={handleDeleteTraining}
        content='Você tem ceterza que deseja excluir este treinamento??'
        title='Deletar'
      />

      <ConfirmationModal
        isOpen={isModalUpdateOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalUpdateOpen(false)
        }}
        onConfimation={handleUpdateStatusOfTraining}
        content='Você tem certeza que deseja alterar o status deste treinamento?'
        title='Confirmação'
      />
    </tr>
  )
}
