import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../application/hooks/usePagination'
import { IExportAllSalesToXLSX } from '../../../../domain/usecases/interfaces/sale/exportAllSalesToXLSX'
import { GetSalesParams, IGetAllSales, SalesFilter } from '../../../../domain/usecases/interfaces/sale/getAllSales'
import { debounce } from '../../../../helpers/debounce'
import { ISalesResponse } from '../../../../interfaces/api-response/salesResponse'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { dateMask } from '../../../formatters/dateFormatter'
import { getProductNamesSingleString } from '../../../formatters/getProductNamesSingleString'
import { Button } from '../../buttons/CustomButton'
import { FilterForm } from '../../filter/FilterForm'
import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Search } from '../../search/Search'
import { Row } from './row'

type SalesTableProps = {
  getAllSales: IGetAllSales
  exportSalesToXLSX: IExportAllSalesToXLSX
}


export function SalesTable({ getAllSales, exportSalesToXLSX }: SalesTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(false)
  const [refresher, setRefresher] = useState(true)

  const [sales, setSales] = useState<ISalesResponse[]>([])
  const [salesQuery, setSalesQuery] = useState('')

  const formRef = useRef<FormHandles>(null)

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  useEffect(() => {
    const paginationParams: GetSalesParams = {
      take: pagination.take,
      order: pagination.order,
      orderBy: pagination.orderBy,
      page: pagination.currentPage,
      name: salesQuery,
    }
    getAllSales
      .getAll(paginationParams)
      .then((data) => {
        setSales(data.data)
        setTotalPage(data.total)
      })
      .catch(() => toast.error('Não foi possível listar as vendas'))
      .finally(() =>
        setTimeout(() => {
          setLoading(false)
        }, 500)
      )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, salesQuery])

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchSales = debounce((text: string) => {
    setSalesQuery(text)
  })

  const handleForm = (data: SalesFilter) => {
    // TODO
  }

  const handleClearFilter = () => {
    formRef.current?.reset()
  }

  const handleClickDownlondExcelClick = () => {
    //exportSalesToXLSX.export(paginationParams)
  }

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-10'>
          <h3 className='card-title align-items-start flex-column mt-5'>
            <Search onChangeText={handleSearchSales} />
          </h3>
          <FilterForm ref={formRef} handleForm={handleForm} />
        </div>

        <div className='card-header border-0 justify-content-end'>
          <div className='card-toolbar gap-5'>
            <Button
              customClasses={[
                ' mb-7 text-dark border border-secondary btn btn-sm button-size-sm btn-outline-secondary',
              ]}
              title='Limpar Filtro'
              onClick={handleClearFilter}
            />

            <Button
              iconPath='/icons/filter.svg'
              type='submit'
              customClasses={['mb-7 btn btn-sm  button-size-sm btn-primary']}
              title='Filtrar'
              form='filter-form'
            />
          </div>
        </div>
        {sales.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('cutomerName')}
                      onClick={() => handleOrdenation('customerName')}
                    >
                      Nome do Cliente
                    </th>
                    <th
                      className={getColumnHeaderClasses('purchaseDate', 'min-w-150px')}
                      onClick={() => handleOrdenation('purchaseDate')}
                    >
                      Data da Compra
                    </th>
                    <th
                      className={getColumnHeaderClasses('product')}
                      onClick={() => handleOrdenation('product')}
                    >
                      Produto
                    </th>
                    <th
                      className={getColumnHeaderClasses('transactionId')}
                      onClick={() => handleOrdenation('transactionId')}
                    >
                      ID da Transação
                    </th>
                    <th
                      className={getColumnHeaderClasses('total', 'min-w-100px')}
                      onClick={() => handleOrdenation('total')}
                    >
                      Total
                    </th>
                    <th
                      className={getColumnHeaderClasses('status', 'min-w-150px')}
                      onClick={() => handleOrdenation('status')}
                    >
                      Status
                    </th>
                    <th className='text-dark min-w-80px text-start rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    sales?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        customerName={item.cart.user.name}
                        purchaseDate={dateMask(item.createdAt.split('T')[0])}
                        product={getProductNamesSingleString(item.products)}
                        transactionId={item.id}
                        total={maskedToMoney(item.cart.total)}
                        status={item.status}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {sales.length == 0 && !loading && <ItemNotFound message='Venda não encontrada' />}

        {loading && <Loading />}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div className='d-flex justify-center align-items-center'>
            <p className='m-0 text-gray-600 lh-1 text-center'>Download:</p>
            <button
              className='btn border border-gray-900 ms-5 p-1'
              title='Exportar Excel'
              onClick={handleClickDownlondExcelClick}
            >
              <RiFileExcel2Line size={20} className='svg-icon-2 mh-50px' />
            </button>
          </div>

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
