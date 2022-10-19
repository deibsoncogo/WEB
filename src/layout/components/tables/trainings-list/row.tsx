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
  belongsToPlans: boolean
  isActive: boolean
  deleteTraining: IDeleteTraining
  handleRefresher: () => void
  handleToggleStatusConfirmation: (trainingId: string) => void
  isAdmin: boolean
}

export function Row({
  id,
  name,
  description,
  price,
  teacherName,
  belongsToPlans,
  isActive,
  deleteTraining,
  handleRefresher,
  handleToggleStatusConfirmation,
  isAdmin,
}: IRow) {
  const [loading, setLoading] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

  async function handleDeleteTraining() {
    setLoading(true)
    try {
      setLoading(true)
      await deleteTraining.deleteTraining()
      handleRefresher()
      toast.success('Treinamento excluído com sucesso!')
    } catch (err) {
      if (err instanceof ConflitctEntitiesError) {
        toast.error('Existem produtos vinculados a este treinamento!')
        return
      }
      toast.error('Erro ao excluir o treinamento Treinamento!')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateStatusOfTraining() {
    handleToggleStatusConfirmation(id)
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
            {isActive ? (
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
        <Switch active={isActive} setModalUpdate={handleUpdateStatusOfTraining} />
      </td>

      <td className='text-end d-flex justify-content-end px-4'>
        <Tooltip content='Editar' rounded color='primary'>
          <Link href={`/trainings/edit/${id}`}>
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
            onClick={
              belongsToPlans
                ? undefined
                : () => {
                    setIsDeleteCategoryModalOpen(true)
                  }
            }
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        )}
      </td>

      <ConfirmationModal
        isOpen={isDeleteCategoryModalOpen}
        loading={loading}
        onRequestClose={() => {
          setIsDeleteCategoryModalOpen(false)
        }}
        onConfimation={handleDeleteTraining}
        content='Você tem ceterza que deseja excluir este treinamento??'
        title='Excluir'
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
