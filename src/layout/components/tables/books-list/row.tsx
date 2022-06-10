import Link from 'next/link'
import { useState } from 'react'

import { KTSVG } from '../../../../helpers'

import ConfirmationModal from '../../modal/ConfirmationModal'
import { ActionModal } from '../../modals/action'

interface IBookRow {
  id: string
  name: string
  description: string
  price: string
  author: string
  stock: number
  isActive: boolean
  deleteBook: (bookId: string) => void
  activeBook: boolean
  loadingDeletion: boolean
  isModalDeletionOpen: boolean
  closeModalDeleteConfirmation: () => void
  openModalDeleteConfirmation: () => void
}

export function Row({
  isActive,
  id,
  author,
  description,
  stock,
  price,
  name,
  deleteBook,
  activeBook,
  loadingDeletion,
  isModalDeletionOpen,
  closeModalDeleteConfirmation,
  openModalDeleteConfirmation,
}: IBookRow) {
  const handleDeleteBook = () => {
    deleteBook(id)
  }

  const handleActiveBook = () => {
    setOpenModal(true)
  }

  async function handleActionModal() {
    console.log('first')
    setIsActiveCurrent(!isActiveCurrent)
    setOpenModal(false)
  }
  const [isActiveCurrent, setIsActiveCurrent] = useState(isActive)
  const [openModal, setOpenModal] = useState(false)
  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{description}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{price}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{author}</span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block fs-7'>{stock}</span>
      </td>
      <td className='justify-content-between d-flex'>
        <div className='form-check form-switch form-switch-sm form-check-custom'>
          <input
            onClick={() => {
              handleActiveBook()
            }}
            className='form-check-input'
            type='checkbox'
            checked={isActiveCurrent}
          />
        </div>
        <Link href={`/books/edit/${id}`}>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Link>

        <button
          onClick={openModalDeleteConfirmation}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>

      <ConfirmationModal
        isOpen={isModalDeletionOpen}
        loading={loadingDeletion}
        onRequestClose={closeModalDeleteConfirmation}
        onConfimation={handleDeleteBook}
        content='Você tem certeza que deseja excluir este livro?'
        title='Deletar'
      />

      <ActionModal
        isOpen={openModal}
        modalTitle='Confirmação'
        message='Você tem certeza que deseja alterar o status deste livro?'
        action={handleActionModal}
        onRequestClose={() => {
          setOpenModal(false)
        }}
      />
    </tr>
  )
}
