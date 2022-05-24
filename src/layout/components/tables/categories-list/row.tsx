import { KTSVG } from '../../../../helpers'
import { Category } from '../../../../interfaces/model/Category'

type RowProps = {
  onOpenDeleteCategoryModal: (categoryId: string) => void
  category: Category
}
export function Row({ category, onOpenDeleteCategoryModal }: RowProps) {
  const { id, name } = category

  function handleOpenDeleteCategoryModal() {
    onOpenDeleteCategoryModal(id)
  }

  return (
    <tr>
      <td className='ps-4'>
        <span className='text-muted fw-bold text-muted d-block fs-7'>{name}</span>
      </td>
      <td className='text-end'>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/gen019.svg' className='svg-icon-3' />
        </a>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
          <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
        </a>
        <button
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          onClick={handleOpenDeleteCategoryModal}
        >
          <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}
