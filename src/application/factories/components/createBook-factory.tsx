import { IBookResponse } from '../../../interfaces/api-response/bookResponse'

import { FormCreateBook } from '../../../layout/components/forms/books/create-book'
import { makeApiUrl, makeAxiosHttpClient } from '../http'
import { RemoteDeleteBook } from '../../../data/usecases/book/remote-deleteBook'
import { Row } from '../../../layout/components/tables/books-list/row'
import BooksTable from '../../../layout/components/tables/books-list'

const makeRemoteDeleteBook = (id: string): IDeleteBook =>
  new RemoteDeleteBook(makeApiUrl(`/books/${id}`), makeAxiosHttpClient())

export const MakeBookTable = () => {
  const data = [
    {
      id: '1',
      title: 'Manual do Aristeu',
      description: 'Livro interessante',
      price: '10',
      author: 'Aristeu',
      inventory: 10,
    },
    {
      id: '2',
      title: 'O livro do ano',
      description: 'Livro interessante',
      price: '10',
      author: 'Manual do Mundo',
      inventory: 10,
    },
    {
      id: '3',
      title: 'Desafiando a física',
      description: 'Livro de Física',
      price: '100',
      author: 'Charles do Bronx',
      inventory: 10,
    },
  ]
  return <BooksTable getAllBooks={data} />
}

export const MakeFormCreateBook = () => {
  return <FormCreateBook />
}

export function MakeBookRow({ id, author, description, inventory, price, title }: IBookResponse) {
  return (
    <Row
      id={id}
      title={title}
      description={description}
      author={author}
      inventory={inventory}
      price={price}
      deleteBook={makeRemoteDeleteBook(id)}
    />
  )
}
