import BooksTable from '../../../../layout/components/tables/books-list'
import { makeRemoteGetBooks } from './remote-getBooks-factory'
import { makeRemoteDeleteBook } from './remote-deleteBookfactory'

export const MakeBookPage = () => {
  return (
    <BooksTable
      remoteGetAllBooks={makeRemoteGetBooks()}
      remoteDeleteBook={makeRemoteDeleteBook()}
    />
  )
}
