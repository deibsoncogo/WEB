import { makeRemoteUpdateBook } from './remote-updateBooks-factory'
import { makeRemoteDeleteBook } from './remote-deleteBookfactory'
import BooksTable from '../../../../layout/components/tables/books-list'
import { makeRemoteGetBooks } from './remote-getBooks-factory'
import { useParams } from 'react-router-dom'

export const MakeBookPage = () => {
  const params = useParams()

  return (
    <BooksTable
      remoteUpdateBook={makeRemoteUpdateBook()}
      remoteGetAllBooks={makeRemoteGetBooks()}
      remoteDeleteBook={makeRemoteDeleteBook()}
    />
  )
}
