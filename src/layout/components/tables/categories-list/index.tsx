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

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

export default function CategoriesTable({
  categories = [],
  paginationHook,
  deleteCategory,
  loadingDeletion,
  setSelectedCategory,
  openUpdateCategoryDrawer,
  onOrder,
  order,
}: Props) {
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

  let orderClass = ''

  if (order) {
    orderClass = order === 'asc' ? 'table-sort-asc' : 'table-sort-desc'
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
        <>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer ${orderClass}`}
                      role='columnheader'
                      onClick={onOrder}
                    >
                      Nome
                    </th>
                    <th className='text-dark min-w-150px text-end rounded-end' />
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
