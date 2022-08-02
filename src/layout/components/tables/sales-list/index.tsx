import { FormHandles } from "@unform/core"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { usePagination } from "../../../../application/hooks/usePagination"
import { IDeleteFreeContent } from "../../../../domain/usecases/interfaces/freeContent/deleteFreeContent"
import { GetFreeContentParams} from "../../../../domain/usecases/interfaces/freeContent/getAllFreeContent"
import { IGetAllSales } from "../../../../domain/usecases/interfaces/sale/getAllSales"
import { KTSVG } from "../../../../helpers"
import { debounce } from "../../../../helpers/debounce"
import { IFreeContentResponse } from "../../../../interfaces/api-response/freeContentResponse"
import { ISalesResponse } from "../../../../interfaces/api-response/salesResponse"
import { maskedToMoney } from "../../../formatters/currenceFormatter"
import { dateMask } from "../../../formatters/dateFormatter"
import { FilterForm } from "../../filter/FilterForm"
import { Loading } from "../../loading/loading"
import { Pagination } from "../../pagination/Pagination"
import { ItemNotFound } from "../../search/ItemNotFound"
import { Search } from "../../search/Search"
import { Row } from "./row"

type SalesTableProps = {
  getAllSales: IGetAllSales  
}

const salesExample: ISalesResponse[] =  [
                      {id: '0001', 
                       customerName: 'Clara Holman', 
                       purchaseDate: '2021-04-27', 
                       product: 'Day Trade Livro 1',
                       transactionId: '123456',
                       total: '1234', status: 'Pago'},

                       {id: '0002', customerName: 'Janet Havens', 
                       purchaseDate: '2021-02-03', 
                       product: 'Livro 2',
                       transactionId: '5645',
                       total: '1234', status: 'Cancelado'},                      
                      ]

export function SalesTable({ getAllSales}: SalesTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(false)
  const [refresher, setRefresher] = useState(true)

  const [sales, setSales] = useState<ISalesResponse[]>(salesExample)
  const [salesQuery, setSalesQuery] = useState('')

  const formRef = useRef<FormHandles>(null)
  
  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }


  useEffect(() => {
    // TODO
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, salesQuery])

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchSales = debounce((text: string) => {
    setSalesQuery(text)
  })

  const handleForm = (data: any) => {
    
  }

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='align-items-start flex-column'>
            <Search onChangeText={handleSearchSales} />
          </h3>          
          <FilterForm ref={formRef} handleForm={handleForm}/>  
        </div>
       

         <div className='card-header border-0 justify-content-end'>
            <div className='card-toolbar gap-5'>
              <a className='text-dark border border-secondary btn btn-sm button-size-sm btn-outline-secondary'>
                Limpar Filtro
              </a>

              <a className='btn btn-sm  button-size-sm btn-primary'>
                <KTSVG path='/icons/filter.svg' className='svg-icon-2' />
                Filtrar
              </a>
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
                        purchaseDate={dateMask(item.purchaseDate)}
                        product={item.product}
                        transactionId={item.transactionId}
                        total={maskedToMoney(item.total)}
                        status={item.status}
                        handleRefresher={handleRefresher}                       
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {salesExample.length == 0 && !loading && <ItemNotFound message='Venda não encontrada' />}

        {loading && <Loading/>}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div />

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
