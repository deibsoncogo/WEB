import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRequest } from '../../../../application/hooks/useRequest'
import {
  DeleteBookParams,
  IDeleteBook,
} from '../../../../domain/usecases/interfaces/book/deleteBook'

import { KTSVG } from '../../../../helpers'
import ConfirmationModal from '../../modal/ConfirmationModal'

interface IBookRow {
  id: string
  name: string
  description: string
  price: string
  author: string
  stock: number
  deleteBook: IDeleteBook
}

export function Row({ id, author, description, stock, price, name, deleteBook }: IBookRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteBook = async () => {
    try {
      await deleteBookRequest({ id })
      console.log(bookSuccessfullDeleted)
      console.log('loadin', bookSuccessfullDeleted)
    } catch (error) {
      console.log('err', error)
      console.log(deleteBookError)
    }
  }

  useEffect(() => {}, [bookSuccessfullDeleted])
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
          onClick={() => {
            setIsModalOpen(true)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>

      <ConfirmationModal
        isOpen={isModalOpen}
        loading={loadingCategoryBook}
        onRequestClose={() => setIsModalOpen(false)}
        onConfimation={handleDeleteBook}
        content='Você tem certeza que deseja excluir este livro?'
        title='Deletar'
      />
    </tr>
  )
}
