import Link from 'next/link'
import { useState } from 'react'

import { KTSVG } from '../../../../helpers'

import { ActionModal } from '../../modals/action'

interface IBookRow {
  id: string
  title: string
  description: string
  price: string
  author: string
  inventory: number
  deleteBook: IDeleteBook
}

export function Row({ id, author, description, inventory, price, title }: IBookRow) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleDeleteBook() {
    try {
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{title}</span>
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
        <span className='text-dark fw-bold d-block fs-7'>{inventory}</span>
      </td>
      <td className='text-end'>
        <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
        </button>
        <Link href={`/users/edit/${id}`}>
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

      <ActionModal
        isOpen={isModalOpen}
        modalTitle='Deletar'
        message='Você tem certeza que deseja excluir esse livro?'
        action={handleDeleteBook}
        onRequestClose={() => {
          setIsModalOpen(false)
        }}
      />
    </tr>
  )
}
