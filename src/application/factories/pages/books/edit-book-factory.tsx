import { EditBookPageTemplate } from '../../../../layout/templates/books/editBook'
import { makeRemoteEditBook } from '../../usecases/book/remote-editBook-factory'
import { makeRemoteGetBook } from '../../usecases/book/remote-getBook-factory'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'

export const MakeEditBook = () => {
  return (
    <EditBookPageTemplate
      remoteGetCategories={makeRemoteGetCategories()}
      remoteGetBook={makeRemoteGetBook()}
      remoteEditBook={makeRemoteEditBook()}
    />
  )
}
