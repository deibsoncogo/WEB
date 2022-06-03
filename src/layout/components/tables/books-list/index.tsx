import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'

import { useEffect, useState } from 'react'
import { GoArrowUp, GoArrowDown } from 'react-icons/go'

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
import { BiCategory } from 'react-icons/bi'
import { RiFileExcel2Line } from 'react-icons/ri'

type Props = {
  remoteGetAllBooks: IGetBooks
}

export default function BooksTable({ remoteGetAllBooks }: Props) {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<IBookResponse[]>([])
  const [columnSelect, setColumnSelect] = useState('')

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook

  const { currentPage, take } = pagination

  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setLoading(false)
  }, [remoteGetAllBooks])

  const { makeRequest: getBooks, data: paginatedBooks } = useRequest<
    OutputPagination,
    GetBookParams
  >(remoteGetAllBooks.get)

  console.log(paginatedBooks)
  console.log('pagi', pagination)
  console.log('search', searchText)

  const paginationParams: GetBookParams = { page: currentPage, take }

  useEffect(() => {
    getBooks(paginationParams)
  }, [currentPage, take])

  useEffect(() => {
    getBooks()
  }, [searchText.length])

  useEffect(() => {
    if (paginatedBooks) {
      const { data, total } = paginatedBooks

      searchText.length > 0
        ? setBooks(
            data.filter(
              (book) =>
                book.name.includes(searchText) || book.name.includes(searchText.toLocaleUpperCase())
            )
          )
        : setBooks(data)

      setTotalPage(total)
    }
  }, [paginatedBooks])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={(value) => setSearchText(value.trim())} />
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
                  onClick={() =>
                    setColumnSelect(columnSelect === 'title-down' ? 'title-up' : 'title-down')
                  }
                  className={`text-${
                    columnSelect.includes('title') ? 'primary' : 'dark'
                  } min-w-150px ps-4 min-w-100px rounded-start`}
                >
                  Título
                  {columnSelect.includes('title-up') && (
                    <GoArrowUp size={16} className='svg-icon-2 mh-50px' />
                  )}
                  {columnSelect.includes('title-down') && (
                    <GoArrowDown size={16} className='svg-icon-2 mh-50px' />
                  )}
                </th>
                <th
                  onClick={() =>
                    setColumnSelect(
                      columnSelect === 'description-down' ? 'description-up' : 'description-down'
                    )
                  }
                  className={`text-${
                    columnSelect.includes('description') ? 'primary' : 'dark'
                  } min-w-150px align-items-center`}
                >
                  Descrição
                  {columnSelect.includes('description-up') && (
                    <GoArrowUp size={16} className='svg-icon-2 mh-50px' />
                  )}
                  {columnSelect.includes('description-down') && (
                    <GoArrowDown size={16} className='svg-icon-2 mh-50px' />
                  )}
                </th>
                <th
                  onClick={() =>
                    setColumnSelect(columnSelect === 'price-down' ? 'price-up' : 'price-down')
                  }
                  className={`text-${
                    columnSelect.includes('price') ? 'primary' : 'dark'
                  } min-w-150px align-items-center`}
                >
                  Preço
                  {columnSelect.includes('price-up') && (
                    <GoArrowUp size={16} className='svg-icon-2 mh-50px' />
                  )}
                  {columnSelect.includes('price-down') && (
                    <GoArrowDown size={16} className='svg-icon-2 mh-50px' />
                  )}
                </th>
                <th
                  onClick={() =>
                    setColumnSelect(columnSelect === 'author-down' ? 'author-up' : 'author-down')
                  }
                  className={`text-${
                    columnSelect.includes('author') ? 'primary' : 'dark'
                  } min-w-150px align-items-center`}
                >
                  Autor
                  {columnSelect.includes('author-up') && (
                    <GoArrowUp size={16} className='svg-icon-2 mh-50px' />
                  )}
                  {columnSelect.includes('author-down') && (
                    <GoArrowDown size={16} className='svg-icon-2 mh-50px' />
                  )}
                </th>
                <th
                  onClick={() =>
                    setColumnSelect(columnSelect === 'stock-down' ? 'stock-up' : 'stock-down')
                  }
                  className={`text-${
                    columnSelect.includes('stock') ? 'primary' : 'dark'
                  } min-w-150px align-items-center`}
                >
                  Estoque
                  {columnSelect.includes('stock-up') && (
                    <GoArrowUp size={16} className='svg-icon-2 mh-50px' />
                  )}
                  {columnSelect.includes('stock-down') && (
                    <GoArrowDown size={16} className='svg-icon-2 mh-50px' />
                  )}
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
        {!searchText && <Pagination paginationHook={paginationHook} />}
      </div>
    </div>
  )
}
