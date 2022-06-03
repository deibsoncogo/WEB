import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'

import { useEffect, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'

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

type Props = {
  remoteGetAllBooks: IGetBooks
}

export default function BooksTable({ remoteGetAllBooks }: Props) {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<IBookResponse[]>([])

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
  console.log(pagination)
  console.log('search', searchText)

  const paginationParams: GetBookParams = { page: currentPage, take }

  useEffect(() => {
    getBooks(paginationParams)
  }, [currentPage, take])

  useEffect(() => {
    if (paginatedBooks) {
      const { data, total } = paginatedBooks
      searchText.length > 0
        ? setBooks(paginatedBooks.data.filter((book) => book.name.includes(searchText)))
        : setBooks(data)
      setTotalPage(total)
    }
  }, [paginatedBooks, searchText])

  return (
    <div className='card mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <Search onChangeText={(value) => setSearchText(value)} />
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
                <th className='text-dark ps-4 min-w-100px rounded-start'>Título</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className='text-dark min-w-100px'>Preço</th>
                <th className='text-dark min-w-150px'>Autor</th>
                <th className='text-dark min-w-100px'>Estoque</th>
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
              <p className='text-center w-100 m-0 font-weight-bold'>Nenhum livro cadastrado.</p>
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
