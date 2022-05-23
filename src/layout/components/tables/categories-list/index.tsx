import { RiFileExcel2Line } from 'react-icons/ri'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { Category } from '../../../../interfaces/model/Category'
import Pagination from '../../pagination/Pagination'
import { Row } from './row'

type Props = {
  categories: Category[]
  paginationHook: usePaginationType
}

export default function CategoriesTable({ categories = [], paginationHook }: Props) {
  return (
    <>
      {categories.length > 0 && (
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bolder text-muted bg-light'>
                  <th className='text-dark ps-4 min-w-100px rounded-start'>Nome</th>
                  <th className='text-dark min-w-150px text-end rounded-end' />
                </tr>
              </thead>

              <tbody className='w-100'>
                {categories?.map((category) => (
                  <Row key={category.id} {...category} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {categories.length < 1 && (
        <div className='py-14 border mx-4 my-8 d-flex'>
          <p className='text-center w-100 m-0 font-weight-bold'>Nenhuma Categoria cadastrada</p>
        </div>
      )}

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div className='d-flex justify-center align-center'>
          <p className='m-0 text-gray-600 lh-1 text-center'>Download:</p>
          <button className='btn border border-gray-900 ms-5 p-1' title='Exportar Exel'>
            <RiFileExcel2Line size={20} className='svg-icon-2 mh-50px' />
          </button>
        </div>

        <Pagination paginationHook={paginationHook} />
      </div>
    </>
  )
}
