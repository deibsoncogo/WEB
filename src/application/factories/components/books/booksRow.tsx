import { Row } from '../../../../layout/components/tables/books-list/row'
import { makeRemoteDeleteBooks } from '../../usecases/book/remote-deleteBookfactory'
import { makeRemoteToggleBookStatus } from '../../usecases/book/remote-toggleBookStatus-factory'

type IMakeBooksRow = {
  id: string
  name: string
  description: string
  price: string | number
  author: string
  stock: number
  active: boolean
  belongsToPlans: boolean
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
  belongsToPlans,
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
      belongsToPlans={belongsToPlans}
      deleteBook={makeRemoteDeleteBooks(id)}
      toggleBookStatus={makeRemoteToggleBookStatus()}
      getBooks={getBooks}
      handleRefresher={handleRefresher}
    />
  )
}
