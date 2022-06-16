import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IToggleTrainingStatus } from '../../../../domain/usecases/interfaces/trainings/toggleTrainingStatus'
import { KTSVG } from '../../../../helpers'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  teacherName: string
  active: boolean
  deleteTraining: IDeleteTraining
  getTrainings(): Promise<void>
  remoteToggleTrainingStatus: IToggleTrainingStatus
}

export function Row({
  id,
  name,
  description,
  price,
  teacherName,
  deleteTraining,
  active,
  remoteToggleTrainingStatus,
  getTrainings,
}: IRow) {
  const [loading, setLoading] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)

  async function handleDeleteTraining() {
    try {
      setLoading(true)
      await deleteTraining.deleteTraining()
      getTrainings()
      toast.success('Treinamento excluído com sucesso')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao deletar o treinamento Treinamento')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleTrainingStatus() {
    try {
      setLoading(true)
      await remoteToggleTrainingStatus.toggle({ id, active: active ? 'false' : 'true' })
      getTrainings()
      toast.success('Status do treinamento atualizado com sucesso.')
    } catch {
      toast.error('Error ao alterar o status do treinamento')
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
        <span className='text-dark fw-bold d-block fs-7'>{teacherName}</span>
      </td>
      <td>
        <button className='btn btn-icon btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/com003.svg' className='svg-icon-3' />
        </button>
      </td>
      <td>
        <div className='form-check form-switch form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={active}
            id='flexSwitchDefault'
            onChange={handleToggleTrainingStatus}
          />
        </div>
      </td>

      <td>
        <Link href={`/trainings/edit/${id}`}>
          <button
            title='Editar'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Link>
        <button
          title='Deletar'
          onClick={() => {
            setIsDeleteCategoryModalOpen(true)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
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
    </tr>
  )
}
