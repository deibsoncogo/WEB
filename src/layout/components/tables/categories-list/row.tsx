import { Tooltip } from '@nextui-org/react'
import { KTSVG } from '../../../../helpers'
import { Category } from '../../../../interfaces/model/Category'

type RowProps = {
  onOpenDeleteCategoryModal: (category: Category) => void
  onOpenUpdateCategoryDrawer: (category: Category) => void
  category: Category
}
export function Row({ category, onOpenDeleteCategoryModal, onOpenUpdateCategoryDrawer }: RowProps) {
  const { name } = category

  function handleOpenDeleteCategoryModal() {
    onOpenDeleteCategoryModal(category)
  }

  function handleOpenUpdateCategoryDrawer() {
    onOpenUpdateCategoryDrawer(category)
  }

  return (
    <tr className='justify-content-between'>
      <td className='ps-4'>
        <span className='text-dark fw-bold d-block fs-7'>{name}</span>
      </td>

      <td className='d-flex justify-content-end' style={{ minWidth: '150px' }}>
        <Tooltip
          content={'Editar'}
          rounded
          color='primary'
          onClick={handleOpenUpdateCategoryDrawer}
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Tooltip>

        <Tooltip
          content={
            category.belongsToProducts
              ? 'Não é possível excluir, pois está vinculada a um produto'
              : 'Excluir'
          }
          rounded
          color='primary'
          onClick={category.belongsToProducts ? undefined : handleOpenDeleteCategoryModal}
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}
