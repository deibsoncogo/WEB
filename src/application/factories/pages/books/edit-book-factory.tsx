import { EditBookPageTemplate } from '../../../../layout/templates/books/editBook'
import { makeRemoteEditBook } from '../../usecases/book/remote-editBook-factory'
import { makeRemoteGetBook } from '../../usecases/book/remote-getBook-factory'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'

export const MakeEditBook = () => {
  return (
    <EditBookPageTemplate
      remoteGetCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
      remoteGetBook={makeRemoteGetBook()}
      remoteEditBook={makeRemoteEditBook()}
    />
  )
}
