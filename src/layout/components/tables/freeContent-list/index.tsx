import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../application/hooks/usePagination'
import { IDeleteFreeContent } from '../../../../domain/usecases/interfaces/freeContent/deleteFreeContent'
import {
  GetFreeContentParams,
  IGetAllFreeContent,
} from '../../../../domain/usecases/interfaces/freeContent/getAllFreeContent'
import { KTSVG } from '../../../../helpers'
import { debounce } from '../../../../helpers/debounce'
import { IFreeContentResponse } from '../../../../interfaces/api-response/freeContentResponse'
import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Search } from '../../search/Search'
import { Row } from './row'

type FreeContentTableProps = {
  getAllFreeContent: IGetAllFreeContent
  deleteFreeContent: IDeleteFreeContent
}

export function FreeContentTable({ getAllFreeContent, deleteFreeContent }: FreeContentTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [freeContent, setFreeContent] = useState<IFreeContentResponse[]>([])
  const [freeContentQuery, setFreeContentQuery] = useState('')

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  useEffect(() => {
    const paginationParams: GetFreeContentParams = {
      take: pagination.take,
      order: pagination.order,
      orderBy: pagination.orderBy,
      page: pagination.currentPage,
      name: freeContentQuery,
    }
    getAllFreeContent
      .getAll(paginationParams)
      .then((data) => {
        setFreeContent(data.data)
        setTotalPage(data.total)
      })
      .catch(() => toast.error('N??o foi poss??vel listar os conte??dos gratuitos!'))
      .finally(() =>
        setTimeout(() => {
          setLoading(false)
        }, 500)
      )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, freeContentQuery])

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchFreeContent = debounce((text: string) => {
    setFreeContentQuery(text)
  })

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search onChangeText={handleSearchFreeContent} />
          </h3>
          <div className='card-toolbar'>
            <Link href='/freeContent/create'>
              <a className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Conte??do
              </a>
            </Link>
          </div>
        </div>

        {freeContent.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-2 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('title') + ' rounded-start'}
                      onClick={() => handleOrdenation('title')}
                    >
                      T??tulo
                    </th>
                    <th
                      className={getColumnHeaderClasses('description', 'min-w-150px')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Descri????o
                    </th>
                    <th
                      className={getColumnHeaderClasses('contentType')}
                      onClick={() => handleOrdenation('contentType')}
                    >
                      Tipo
                    </th>
                    <th
                      className={getColumnHeaderClasses('link')}
                      onClick={() => handleOrdenation('link')}
                    >
                      Link
                    </th>
                    <th
                      className={getColumnHeaderClasses('articleContent', 'min-w-150px')}
                      onClick={() => handleOrdenation('articleContent')}
                    >
                      Texto
                    </th>
                    <th
                      className='text-dark min-w-80px text-end rounded-end'
                      style={{ verticalAlign: 'middle', paddingRight: '3.5rem' }}
                    >
                      A????o
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    freeContent?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        contentType={item.contentType}
                        link={item?.link}
                        articleContent={item?.articleContent}
                        deleteFreeContent={deleteFreeContent}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {freeContent.length == 0 && !loading && <ItemNotFound message='Conte??do n??o encontrado' />}

        {loading && <Loading />}

        <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
