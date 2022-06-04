import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRequest } from '../../../../application/hooks/useRequest'
import { IDeleteBook } from '../../../../domain/usecases/interfaces/book/deleteBook'

import { KTSVG } from '../../../../helpers'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IBookRow {
  id: string
  name: string
  description: string
  price: string
  author: string
  stock: number
  deleteBook: (bookId: string) => void
  loadingDeletion: boolean
  isModalDeletionOpen: boolean
  closeModalDeleteConfirmation: () => void
  openModalDeleteConfirmation: () => void
}

export function Row({
  id,
  author,
  description,
  stock,
  price,
  name,
  deleteBook,
  loadingDeletion,
  isModalDeletionOpen,
  closeModalDeleteConfirmation,
  openModalDeleteConfirmation,
}: IBookRow) {
  const handleDeleteBook = () => {
    deleteBook(id)
  }

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
      <td className='text-end'>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
        </button>
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
    </tr>
  )
}
