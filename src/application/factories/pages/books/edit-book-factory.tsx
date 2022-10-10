import { EditBookPageTemplate } from '../../../../layout/templates/books/editBook'
import { makeRemoteEditBook } from '../../usecases/book/remote-editBook-factory'
import { makeRemoteGetBook } from '../../usecases/book/remote-getBook-factory'

export const MakeEditBook = () => {
  return (
    <EditBookPageTemplate
      remoteGetBook={makeRemoteGetBook()}
      remoteEditBook={makeRemoteEditBook()}
    />
  )
}
