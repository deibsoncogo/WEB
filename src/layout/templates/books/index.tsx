import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../application/hooks/usePagination'
import { IBook } from '../../../domain/models/book'
import { IGetAllBooks, IGetAllBooksParams } from '../../../domain/usecases/interfaces/book/getAllBooks'
import { KTSVG } from '../../../helpers'
import { debounce } from '../../../helpers/debounce'
import { Search } from '../../components/search/Search'
import { BooksTable } from '../../components/tables/books-list'

type IBooksTemplate = {
  remoteGetAllBooks: IGetAllBooks
}

export function BooksTemplate({ remoteGetAllBooks }: IBooksTemplate) {
  const [refresher, setRefresher] = useState(true)
  const [books, setBooks] = useState<IBook[]>([] as IBook[])
  const [bookName, setBookName] = useState('')

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage, order } = pagination
  const paginationParams: IGetAllBooksParams = {
    page: currentPage,
    name: bookName,
    take,
    order,
    orderBy: pagination.orderBy,
  }

  async function getBooks() {
    try {
      const { total, data } = await remoteGetAllBooks.getAll(paginationParams)
      setTotalPage(total)
      setBooks(data)
    } catch (err) {
      toast.error('Erro ao buscar livros.')
    }
  }

  const handleSearch = debounce((text: string) => {
    setBookName(text)
  })

  function handleRefresher() {
    setRefresher(!refresher)
  }

  useEffect(() => {
    getBooks()
  }, [
    pagination.take,
    pagination.totalPages,
    pagination.order,
    pagination.orderBy,
    currentPage,
    bookName,
  ])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={handleSearch} />
        </h3>

        <div className='card-toolbar'>
          <Link href='/books/create'>
            <a className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Novo Livro
            </a>
          </Link>
        </div>
      </div>

      <BooksTable
        books={books}
        paginationHook={paginationHook}
        getBooks={getBooks}
        handleRefresher={handleRefresher}
      />
    </div>
  )
}