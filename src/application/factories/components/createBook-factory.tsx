import { IBookResponse } from '../../../interfaces/api-response/bookResponse'

import { FormCreateBook } from '../../../layout/components/forms/books/create-book'
import { makeApiUrl, makeAxiosHttpClient } from '../http'
import { RemoteDeleteBook } from '../../../data/usecases/book/remote-deleteBook'
import { Row } from '../../../layout/components/tables/books-list/row'
import BooksTable from '../../../layout/components/tables/books-list'

const makeRemoteDeleteBook = (id: string): IDeleteBook =>
  new RemoteDeleteBook(makeApiUrl(`/books/${id}`), makeAxiosHttpClient())

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
      deleteBook={makeRemoteDeleteBook(id)}
    />
  )
}
