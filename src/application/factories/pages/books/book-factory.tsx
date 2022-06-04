import { makeRemoteGetBooks } from './remote-getBooks-factory'
import { makeRemoteDeleteBook } from './remote-deleteBookfactory'
import BooksTable from '../../../../layout/components/tables/books-list'

export const MakeBookPage = () => {
  return (
    <BooksTable
      remoteGetAllBooks={makeRemoteGetBooks()}
      remoteDeleteBook={makeRemoteDeleteBook()}
    />
  )
}
