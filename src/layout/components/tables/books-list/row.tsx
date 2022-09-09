import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { IToggleBookStatus } from '../../../../domain/usecases/interfaces/book/toggleBookStatus'
import { KTSVG } from '../../../../helpers'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { Switch } from '../../inputs'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IRow {
  id: string
  name: string
  description: string
  price: string | number
  authorName: string
  stock: number
  active: boolean
  belongsToPlans: boolean
  deleteBook: IDeleteBook
  toggleBookStatus: IToggleBookStatus
  getBooks(): Promise<void>
  handleRefresher: () => void
}

export function Row({
  id,
  name,
  description,
  price,
  authorName,
  stock,
  active,
  belongsToPlans,
  deleteBook,
  toggleBookStatus,
  getBooks,
  handleRefresher,
}: IRow) {
  const [loading, setLoading] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

  async function handleDeleteBook() {
    setLoading(true)
    try {
      setLoading(true)
      await deleteBook.deleteBook()
      getBooks()
      toast.success('Livro excluído com sucesso')
    } catch (err) {
      toast.error('Erro ao excluir o livro')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateStatusOfBook() {
    setLoading(true)

    try {
      await toggleBookStatus.toggle({ id: String(id) })
      handleRefresher()
      toast.success(`Livro ${!active ? 'ativado' : 'desativado'} com sucesso`)
    } catch (err) {
      toast.error('Erro ao atualizar o status do livro')
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
        <span className='text-dark fw-bold d-block fs-7'>{authorName}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{stock}</span>
      </td>
      <td>
        <Switch active={active} setModalUpdate={setIsModalUpdateOpen} />
      </td>

      <td className='text-start d-flex justify-content-start px-4'>
        <Tooltip content='Editar' rounded color='primary'>
          <Link href={`/books/edit/${id}`}>
            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
              <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
            </button>
          </Link>
        </Tooltip>

        <Tooltip
          content={belongsToPlans ? 'Não é possível deletar, pois pertence a um plano' : 'Deletar'}
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
          <button
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            disabled={belongsToPlans}
          >
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
        onConfimation={handleDeleteBook}
        content='Você tem certeza que deseja excluir este livro?'
        title='Deletar'
      />

      <ConfirmationModal
        isOpen={isModalUpdateOpen}
        loading={loading}
        onRequestClose={() => {
          setIsModalUpdateOpen(false)
        }}
        onConfimation={handleUpdateStatusOfBook}
        content='Você tem certeza que deseja alterar o status deste livro?'
        title='Confirmação'
      />
    </tr>
  )
}
