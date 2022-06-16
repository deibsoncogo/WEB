import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

import { toast } from 'react-toastify'
import { KTSVG } from '../../../../helpers'
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
      await deleteTraining.deleteTraining()
      getTrainings()
      toast.success('Treinamento excluído com sucesso')
    } catch (err) {
      console.log(err)
      toast.error('Erro ao deletar o treinamento Treinamento')
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
      console.log(err)
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
        <span className='text-dark fw-bold d-block fs-7'>{price}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{teacherName}</span>
      </td>
      <td>
        <Tooltip content='Chat' rounded color='primary'>
          <Link href='/trainings/chat'>
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
        <Switch active={active} setModalUpdate={setIsModalUpdateOpen} />
      </td>

      <td className='text-end'>
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
