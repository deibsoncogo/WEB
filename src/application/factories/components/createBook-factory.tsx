import { IBookResponse } from '../../../interfaces/api-response/bookResponse'

import { Row } from '../../../layout/components/tables/books-list/row'

type MakeBookRowType = {
  book: IBookResponse
  deleteBook: (bookId: string) => void
  loadingDeletion: boolean
  isModalDeletionOpen: boolean
  closeModalDeleteConfirmation: () => void
  openModalDeleteConfirmation: () => void
}

export function MakeBookRow({
  book,
  deleteBook,
  loadingDeletion,
  isModalDeletionOpen,
  closeModalDeleteConfirmation,
  openModalDeleteConfirmation,
}: MakeBookRowType) {
  const { id, author, description, stock, price, name } = book

  let isActive = true
  return (
    <Row
      id={id}
      name={name}
      description={description}
      author={author}
      stock={stock}
      price={price}
      isActive={isActive}
      deleteBook={deleteBook}
      loadingDeletion={loadingDeletion}
      isModalDeletionOpen={isModalDeletionOpen}
      closeModalDeleteConfirmation={closeModalDeleteConfirmation}
      openModalDeleteConfirmation={openModalDeleteConfirmation}
    />
  )
}
