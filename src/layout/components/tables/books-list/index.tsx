import { MakeBooksRow } from '../../../../application/factories/components/books/booksRow'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { IBook } from '../../../../domain/models/book'
import { Pagination } from '../../pagination/Pagination'

type IBooksTable = {
  books: IBook[]
  paginationHook: usePaginationType
  getBooks(): Promise<void>
  handleRefresher: () => void
}

export function BooksTable({ books, paginationHook, getBooks, handleRefresher }: IBooksTable) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook

  const getColumnHeaderClasses = (name: string) => {
    return `text-dark ps-4 min-w-100px cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  return (
    <>
      {books.length !== 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-2 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('name') + ' rounded-start'}
                      onClick={() => handleOrdenation('name')}
                    >
                      Título
                    </th>
                    <th
                      className={getColumnHeaderClasses('description')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Descrição
                    </th>
                    <th
                      className={getColumnHeaderClasses('price')}
                      onClick={() => handleOrdenation('price')}
                    >
                      Preço
                    </th>
                    <th
                      className={getColumnHeaderClasses('author')}
                      onClick={() => handleOrdenation('author')}
                    >
                      Autor
                    </th>
                    <th
                      className={getColumnHeaderClasses('stock')}
                      onClick={() => handleOrdenation('stock')}
                    >
                      Estoque
                    </th>
                    <th
                      className={getColumnHeaderClasses('active')}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Ativo
                    </th>
                    <th className='text-dark min-w-50px text-end rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {books?.map((item) => (
                    <MakeBooksRow
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      author={item.author}
                      stock={item.stock}
                      active={item.isActive}
                      belongsToPlans={item.belongsToPlans}
                      getBooks={getBooks}
                      handleRefresher={handleRefresher}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='ms-auto'>
            <Pagination paginationHook={paginationHook} />
          </div>
        </>
      )}
      {books.length === 0 && (
        <div className='py-14 border mx-4 my-8 d-flex'>
          <p className='text-center w-100 m-0 font-weight-bold'>
            <span className='text-danger'>Ops! 😅 </span>
            Nenhum livro encontrado
          </p>
        </div>
      )}
    </>
  )
}
