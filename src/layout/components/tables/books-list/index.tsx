import Link from 'next/link'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'

import { useEffect, useState } from 'react'

import { MakeBookRow } from '../../../../application/factories/components/createBook-factory'
import { Pagination } from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import {
  GetBookParams,
  IGetBooks,
  IUpdateBook,
  OutputPagination,
} from '../../../../domain/usecases/interfaces/book/getBooks'
import { useRequest } from '../../../../application/hooks/useRequest'
import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'

import { RiFileExcel2Line } from 'react-icons/ri'

import { debounce } from '../../../../helpers/debounce'
import { IDeleteBook } from '../../../../domain/usecases/interfaces/book/deleteBook'
import { DeleteCategoryParams } from '../../../../domain/usecases/interfaces/category/deleteCategory'
import { toast } from 'react-toastify'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'

type Props = {
  remoteGetAllBooks: IGetBooks
  remoteDeleteBook: IDeleteBook
  remoteUpdateBook: IUpdateBook
}

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

const BooksTable = ({ remoteGetAllBooks, remoteDeleteBook, remoteUpdateBook }: Props) => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<IBookResponse[]>([])

  const paginationHook = usePagination()
  const { pagination, setTotalPage } = paginationHook

  const { currentPage, take } = pagination

  const [searchText, setSearchText] = useState('')

  const [order, setOrder] = useState<orderOptions>('')

  const [isModalDeleteBookOpen, setIsModalDeleteBookOpen] = useState(false)

  const {
    makeRequest: deleteBookRequest,
    error: deleteBookError,
    data: bookSuccessfullDeleted,
    loading: loadingBookDeleteion,
    cleanError: cleanUpBookDeletionsError,
  } = useRequest<string, DeleteCategoryParams>(remoteDeleteBook.delete)

  useEffect(() => {
    setLoading(false)
  }, [remoteGetAllBooks])

  const { makeRequest: getBooks, data: paginatedBooks } = useRequest<
    OutputPagination,
    GetBookParams
  >(remoteGetAllBooks.get)

  const paginationParams: GetBookParams = { page: currentPage, take, name: searchText }

  const handleCloseModalConfirmDeletion = () => {
    setIsModalDeleteBookOpen(false)
  }

  const handleActiveBook = () => {
    setIsModalDeleteBookOpen(false)
  }

  const handleOpenModalConfirmDeletion = () => {
    setIsModalDeleteBookOpen(true)
  }

  const handleBookDelettion = (bookId: string) => {
    deleteBookRequest({ id: bookId })
  }

  useEffect(() => {
    getBooks(paginationParams)
  }, [currentPage, take, searchText, bookSuccessfullDeleted])

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

  useEffect(() => {
    if (bookSuccessfullDeleted) {
      handleCloseModalConfirmDeletion()
      toast.success('Livro deletado com sucesso')
      cleanUpBookDeletionsError()
    }
  }, [bookSuccessfullDeleted])

  useEffect(() => {
    if (deleteBookError) {
      toast.error(deleteBookError)
    }
  }, [deleteBookError])

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
                >
                  Título
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                >
                  Descrição
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                >
                  Preço
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                >
                  Autor
                </th>

                <th
                  className={`text-dark  min-w-150px cursor-pointer ${order}`}
                  role='columnheader'
                >
                  Estoque
                </th>

                <th className='text-dark min-w-150px text-end rounded-end' />
              </tr>
            </thead>

            <tbody>
              {!loading &&
                books?.map((book) => (
                  <MakeBookRow
                    key={book.id}
                    book={book}
                    deleteBook={handleBookDelettion}
                    loadingDeletion={loadingBookDeleteion}
                    isModalDeletionOpen={isModalDeleteBookOpen}
                    closeModalDeleteConfirmation={handleCloseModalConfirmDeletion}
                    openModalDeleteConfirmation={handleOpenModalConfirmDeletion}
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

export default BooksTable
