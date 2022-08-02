import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { usePagination } from "../../../../application/hooks/usePagination"
import { IDeleteFreeContent } from "../../../../domain/usecases/interfaces/freeContent/deleteFreeContent"
import { GetFreeContentParams} from "../../../../domain/usecases/interfaces/freeContent/getAllFreeContent"
import { IGetAllSales } from "../../../../domain/usecases/interfaces/sale/getAllSales"
import { KTSVG } from "../../../../helpers"
import { debounce } from "../../../../helpers/debounce"
import { IFreeContentResponse } from "../../../../interfaces/api-response/freeContentResponse"
import { ISalesResponse } from "../../../../interfaces/api-response/salesResponse"
import { Loading } from "../../loading/loading"
import { Pagination } from "../../pagination/Pagination"
import { ItemNotFound } from "../../search/ItemNotFound"
import { Search } from "../../search/Search"
import { Row } from "./row"

type SalesTableProps = {
  getAllSales: IGetAllSales
  deleteFreeContent: IDeleteFreeContent
}

const salesExample: ISalesResponse[] =  [
                      {id: '0001', 
                       customerName: 'Clara Holman', 
                       purchaseDate: '27/04/2022', 
                       product: 'Day Trade Livro 1',
                       transactionId: '123456',
                       total: '1234', status: 'Pago'},

                       {id: '0002', customerName: 'Janet Havens', 
                       purchaseDate: '22/02/2021', 
                       product: 'Livro 2',
                       transactionId: '5645',
                       total: '1234', status: 'Cancelado'},                      
                      ]

export function SalesTable({ getAllSales, deleteFreeContent }: SalesTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [freeContent, setFreeContent] = useState<IFreeContentResponse[]>([])
  const [freeContentQuery, setFreeContentQuery] = useState('')

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  /*
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
       .catch(() => toast.error('Não foi possível listar os conteúdos gratuitos.'))
       .finally(() =>
         setTimeout(() => {
           setLoading(false)
         }, 500)
       )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, freeContentQuery])
 */
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
                <KTSVG path='/icons/filter.svg' className='svg-icon-2' />
                Filtrar
              </a>
            </Link>
          </div>
        </div>

        {salesExample.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('title')}
                      onClick={() => handleOrdenation('title')}
                    >
                      Nome do Cliente
                    </th>
                    <th
                      className={getColumnHeaderClasses('description', 'min-w-150px')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Data da Compra
                    </th>
                    <th
                      className={getColumnHeaderClasses('contentType')}
                      onClick={() => handleOrdenation('contentType')}
                    >
                      Produto
                    </th>
                    <th
                      className={getColumnHeaderClasses('link')}
                      onClick={() => handleOrdenation('link')}
                    >
                      ID da Transação
                    </th>                
                    <th
                      className={getColumnHeaderClasses('articleContent', 'min-w-150px')}
                      onClick={() => handleOrdenation('articleContent')}
                    >
                      Total
                    </th>
                    <th
                      className={getColumnHeaderClasses('articleContent', 'min-w-150px')}
                      onClick={() => handleOrdenation('articleContent')}
                    >
                      Status
                    </th>
                    <th className='text-dark min-w-80px text-start rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    salesExample?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        customerName={item.customerName}
                        purchaseDate={item.purchaseDate}
                        product={item.product}
                        transactionId={item.transactionId}
                        total={item.total}
                        status={item.status}
                        handleRefresher={handleRefresher}                       
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {freeContent.length == 0 && !loading && <ItemNotFound message='Venda não encontrada' />}

        {loading && <Loading/>}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div />

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
