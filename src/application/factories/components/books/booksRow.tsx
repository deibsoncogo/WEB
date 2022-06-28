import { Row } from '../../../../layout/components/tables/books-list/row'
import { makeRemoteDeleteBooks } from '../../usecases/book/remote-deleteBookfactory'
import { makeRemoteUpdateBooks } from '../../usecases/book/remote-updateBook'

type IMakeBooksRow = {
  id: string
  name: string
  description: string
  price: string | number
  author: string
  stock: number
  active: boolean
  getBooks(): Promise<void>
  handleRefresher: () => void
}

export function MakeBooksRow({
  id,
  name,
  description,
  price,
  author,
  stock,
  active,
  getBooks,
  handleRefresher,
}: IMakeBooksRow) {
  return (
    <Row
      id={id}
      name={name}
      description={description}
      price={price}
      authorName={author}
      stock={stock}
      active={active}
      deleteBook={makeRemoteDeleteBooks(id)}
      updateStatusOfBook={makeRemoteUpdateBooks()}
      getBooks={getBooks}
      handleRefresher={handleRefresher}
    />
  )
}
