import BooksTable from '../../../../layout/components/tables/books-list'

import { makeRemoteCreateCategory } from '../../usecases/categories/remote-createCategory-factory'
import { makeRemoteDeleteCategories } from '../../usecases/categories/remote-deleteCategory-factory'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'
import { makeRemoteUpdateCategory } from '../../usecases/categories/remote-updateCategory-factory'

export const MakeBookPage = () => {
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
