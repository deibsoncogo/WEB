import BooksTable from '../../../../layout/components/tables/books-list'
import { makeRemoteGetBooks } from './remote-getBooks-factory'
import { makeRemoteCreateCategory } from '../../usecases/categories/remote-createCategory-factory'
import { makeRemoteDeleteCategories } from '../../usecases/categories/remote-deleteCategory-factory'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'
import { makeRemoteUpdateCategory } from '../../usecases/categories/remote-updateCategory-factory'

export const MakeBookPage = () => {
  return <BooksTable remoteGetAllBooks={makeRemoteGetBooks()} />
}
