import { FormHandles } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { usePagination } from '../../../../application/hooks/usePagination'
import { IExportAllSalesToXLSX } from '../../../../domain/usecases/interfaces/sale/exportAllSalesToXLSX'
import { IGetAllSales, SalesFilter } from '../../../../domain/usecases/interfaces/sale/getAllSales'
import { debounce } from '../../../../helpers/debounce'
import { ISalesResponse } from '../../../../interfaces/api-response/salesResponse'
import { maskedToMoney } from '../../../formatters/currenceFormatter'
import { dateMask } from '../../../formatters/dateFormatter'
import { Button } from '../../buttons/CustomButton'
import { FilterForm } from '../../filter/FilterForm'
import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Search } from '../../search/Search'
import { Row } from './row'

const salesExample: ISalesResponse[] = [
  {
    id: '0001',
    customerName: 'Clara Holman',
    purchaseDate: '2021-04-27',
    product: 'Day Trade Livro 1',
    transactionId: '123456',
    total: '1234',
    status: 'Pago',
  },

  {
    id: '0002',
    customerName: 'Janet Havens',
    purchaseDate: '2021-02-03',
    product: 'Livro 2',
    transactionId: '5645',
    total: '1234',
    status: 'Cancelado',
  },
]

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
