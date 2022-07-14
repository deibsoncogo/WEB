import { BooksTemplate } from '../../../../layout/templates/books'
import { makeRemoteGetAllBooks } from '../../usecases/book/remote-getAllBooks-factory'

export const MakeBookPage = () => {
  return (
    <BooksTemplate
      remoteGetAllBooks={makeRemoteGetAllBooks()}
    />
  )
}
