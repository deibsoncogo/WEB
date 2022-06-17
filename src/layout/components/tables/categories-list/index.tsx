import axios from 'axios'
import { useEffect, useState } from 'react'
import { RiFileExcel2Line } from 'react-icons/ri'
import { usePaginationType } from '../../../../application/hooks/usePagination'
import { Category } from '../../../../interfaces/model/Category'
import ConfirmationModal from '../../modal/ConfirmationModal'
import { Pagination } from '../../pagination/Pagination'
import { Row } from './row'

type Props = {
  categories: Category[]
  paginationHook: usePaginationType
  deleteCategory: () => void
  loadingDeletion: boolean
  setSelectedCategory: (category: Category | undefined) => void
  openUpdateCategoryDrawer: (category: Category) => void
  onOrder: () => void
  order: 'asc' | 'desc' | undefined
}

export default function CategoriesTable({
  categories = [],
  paginationHook,
  deleteCategory,
  loadingDeletion,
  setSelectedCategory,
  openUpdateCategoryDrawer,
}: Props) {
  const { getClassToCurrentOrderColumn, handleOrdenation } = paginationHook
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

  const getColumnHeaderClasses = (name: string) => {
    return `text-dark ps-4 rounded-start cursor-pointer cursor-pointer min-w-200px ${getClassToCurrentOrderColumn(
      name
    )}`
  }

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
      {categories.length > 0 && (
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4 datatable'>
              <thead>
                <tr className='fw-bolder text-muted bg-light d-flex justify-content-between'>
                  <th
                    role='columnheader'
                    className={getColumnHeaderClasses('name')}
                    onClick={() => handleOrdenation('name')}
                  >
                    Nome
                  </th>
                  <th className='text-dark rounded-end' style={{ minWidth: '150px' }}>
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className='w-100'>
                {categories?.map((category) => (
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

      <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
        <Pagination paginationHook={paginationHook} />
      </div>
    </>
  )
}
