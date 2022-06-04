import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'

import { useEffect, useState } from 'react'

import { MakeBookRow } from '../../../../application/factories/components/createBook-factory'
import Pagination from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import {
  GetBookParams,
  IGetBooks,
  OutputPagination,
} from '../../../../domain/usecases/interfaces/book/getBooks'
import { useRequest } from '../../../../application/hooks/useRequest'
import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'

import { RiFileExcel2Line } from 'react-icons/ri'
import { Book } from '../../../../interfaces/model/Book'
import { debounce } from '../../../../helpers/debounce'
import {
  DeleteBookParams,
  IDeleteBook,
} from '../../../../domain/usecases/interfaces/book/deleteBook'

type Props = {
  remoteGetAllBooks: IGetBooks
  remoteDeleteBook: IDeleteBook
}

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

export default function BooksTable({ remoteGetAllBooks, remoteDeleteBook }: Props) {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<IBookResponse[]>([])

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook

  const { currentPage, take } = pagination

  const [searchText, setSearchText] = useState('')

  const [order, setOrder] = useState<orderOptions>('')

  const {
    makeRequest: deleteBookRequest,
    error: deleteBookError,
    data: bookSuccessfullDeleted,
    loading: loadingCategoryBook,
  } = useRequest<string, DeleteBookParams>(remoteDeleteBook.delete)

  useEffect(() => {
    setLoading(false)
  }, [remoteGetAllBooks])

  const { makeRequest: getBooks, data: paginatedBooks } = useRequest<
    OutputPagination,
    GetBookParams
  >(remoteGetAllBooks.get)

  const paginationParams: GetBookParams = { page: currentPage, take, name: searchText }

  useEffect(() => {
    getBooks(paginationParams)
  }, [currentPage, take, searchText])

  useEffect(() => {
    if (paginatedBooks) {
      const { data, total } = paginatedBooks
      setBooks(data)
      setTotalPage(total)
    }
  }, [paginatedBooks])

  const handleSearchBook = debounce((text: string) => {
    setSearchText(text.trim())
  })

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={handleSearchBook} />
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

      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th
                  className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer ${order}`}
                  role='columnheader'
                  onClick={handleOrderCategory}
                >
                  Título
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                  onClick={handleOrderCategory}
                >
                  Descrição
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                  onClick={handleOrderCategory}
                >
                  Preço
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                  onClick={handleOrderCategory}
                >
                  Autor
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                  onClick={handleOrderCategory}
                >
                  Estoque
                </th>

                <th className='text-dark min-w-150px text-end rounded-end' />
              </tr>
            </thead>

            <tbody>
              {!loading &&
                books?.map((item) => (
                  <MakeBookRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    author={item.author}
                    stock={item.stock}
                    description={item.description}
                    category={item.category}
                    discount={item.discount}
                    imageUrl={item.imageUrl}
                  />
                ))}
            </tbody>
          </table>

          {books && books.length < 1 && (
            <div className='py-14 border mx-4 my-8 d-flex'>
              <p className='text-center w-100 m-0 font-weight-bold'>{`Nenhum livro ${
                searchText ? 'encontrado' : 'cadastrado'
              }.`}</p>
            </div>
          )}
        </div>
      </div>

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div className='d-flex justify-center align-center'>
          <p className='m-0 text-gray-600 lh-1 text-center'>Download:</p>
          <button className='btn border border-gray-900 ms-5 p-1' title='Exportar Exel'>
            <RiFileExcel2Line size={20} className='svg-icon-2 mh-50px' />
          </button>
        </div>
        <Pagination paginationHook={paginationHook} />
      </div>
    </div>
  )
}
