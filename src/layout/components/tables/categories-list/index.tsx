import { useState } from 'react'
import { usePaginationType } from '../../../../application/hooks/usePagination'

import { Row } from './row'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'

import ConfirmationModal from '../../modal/ConfirmationModal'
import { Category } from '../../../../interfaces/model/Category'

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
        content='Você tem certeza que deseja excluir esta categoria?'
        title='Excluir'
      />
      {categories.length > 0 && (
        <>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-2 gy-4 datatable'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light justify-content-between'>
                    <th
                      role='columnheader'
                      className={getColumnHeaderClasses('name')}
                      onClick={() => handleOrdenation('name')}
                    >
                      Nome
                    </th>
                    <th
                      className='text-dark text-end rounded-end'
                      style={{ minWidth: '150px', paddingRight: '3rem' }}
                    >
                      Ação
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

          <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
            <Pagination paginationHook={paginationHook} />
          </div>
        </>
      )}

      {categories.length === 0 && <ItemNotFound message='Nenhuma categoria encontrado' />}
    </>
  )
}
