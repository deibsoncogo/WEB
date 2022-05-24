import { useEffect, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { Category } from '../../../../interfaces/model/Category'
import ConfirmationModal from '../../modal/ConfirmationModal'
import Pagination from '../../pagination/Pagination'
import { Row } from './row'

type Props = {
  categories: Category[]
  paginationHook: usePaginationType
  deleteCategory: () => void
  loadingDeletion: boolean
  setSelectedCategory: (category: Category | undefined) => void
  openUpdateCategoryDrawer: (category: Category) => void
}

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

export default function CategoriesTable({
  categories = [],
  paginationHook,
  deleteCategory,
  loadingDeletion,
  setSelectedCategory,
  openUpdateCategoryDrawer,
}: Props) {
  const [order, setOrder] = useState<orderOptions>('')
  const [orderedCategories, setOrdererCategories] = useState<Category[]>(categories)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)

  const handleOpenIsDeleteCategoryModal = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteCategoryModalOpen(true)
  }

  const handleCloseIsDeleteCategoryModal = () => {
    setSelectedCategory(undefined)
    setIsDeleteCategoryModalOpen(false)
  }

  const handleConfimationModal = () => {
    deleteCategory()
    setIsDeleteCategoryModalOpen(false)
  }

  const handleOpenUpdateCategoryDrawer = (category: Category) => {
    openUpdateCategoryDrawer(category)
  }

  const handleOrderCategory = () => {
    console.log(order)
    switch (order) {
      case '':
        return setOrder('table-sort-asc')
      case 'table-sort-asc':
        return setOrder('table-sort-desc')
      default:
        setOrder('')
    }
  }

  const orderCategoryNameASC = (categoryA: Category, categoryB: Category) => {
    const firtstCharValue = categoryA.name.charCodeAt(0)
    const secondCharValue = categoryB.name.charCodeAt(0)
    return firtstCharValue - secondCharValue
  }

  const orderCategoryNameDESC = (categoryA: Category, categoryB: Category) => {
    const firtstCharValue = categoryA.name.charCodeAt(0)
    const secondCharValue = categoryB.name.charCodeAt(0)
    return secondCharValue - firtstCharValue
  }

  useEffect(() => {
    if (order === 'table-sort-asc') {
      setOrdererCategories((oldstate) => {
        const updatedOrderedCategories = oldstate.sort(orderCategoryNameASC)
        return updatedOrderedCategories
      })
    }

    if (order == 'table-sort-desc') {
      setOrdererCategories((oldstate) => {
        const updatedOrderedCategories = oldstate.sort(orderCategoryNameDESC)
        return updatedOrderedCategories
      })
    }

    if (order === '') {
      setOrdererCategories(categories)
    }
  }, [order, categories])

  return (
    <>
      <ConfirmationModal
        isOpen={isDeleteCategoryModalOpen}
        loading={loadingDeletion}
        onRequestClose={handleCloseIsDeleteCategoryModal}
        onConfimation={handleConfimationModal}
        content='Você tem ceterza que deseja excluir esta categoria?'
        title='Deletar'
      />
      {orderedCategories.length > 0 && (
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4 datatable'>
              <thead>
                <tr className='fw-bolder text-muted bg-light'>
                  <th
                    className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer ${order}`}
                    role='columnheader'
                    onClick={handleOrderCategory}
                  >
                    Nome
                  </th>
                  <th className='text-dark min-w-150px text-end rounded-end' />
                </tr>
              </thead>

              <tbody className='w-100'>
                {orderedCategories?.map((category) => (
                  <Row
                    key={category.id}
                    category={category}
                    onOpenDeleteCategoryModal={handleOpenIsDeleteCategoryModal}
                    onOpenUpdateCategoryDrawer={handleOpenUpdateCategoryDrawer}
                  />
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
