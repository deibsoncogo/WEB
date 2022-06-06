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
    <tr>
      <td className='ps-4'>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{name}</span>
      </td>

      <td className='text-end d-flex justify-content-end px-4'>
        <Tooltip
          content={'Editar'}
          rounded
          color='primary'
          onClick={handleOpenUpdateCategoryDrawer}
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-md me-1'>
            <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
          </button>
        </Tooltip>

        <Tooltip
          content={'Deletar'}
          rounded
          color='primary'
          onClick={handleOpenDeleteCategoryModal}
        >
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-md'>
            <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
          </button>
        </Tooltip>
      </td>
    </tr>
  )
}
