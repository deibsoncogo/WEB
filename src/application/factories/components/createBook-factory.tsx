import { IBookResponse } from '../../../interfaces/api-response/bookResponse'

import { FormCreateBook } from '../../../layout/components/forms/books/create-book'

import { Row } from '../../../layout/components/tables/books-list/row'
import { makeRemoteDeleteBook } from '../pages/books/remote-deleteBookfactory'

export const MakeFormCreateBook = () => {
  return <FormCreateBook />
}

export function MakeBookRow({ id, author, description, stock, price, name }: IBookResponse) {
  return (
    <Row
      id={id}
      name={name}
      description={description}
      author={author}
      stock={stock}
      price={price}
      deleteBook={makeRemoteDeleteBook()}
    />
  )
}
