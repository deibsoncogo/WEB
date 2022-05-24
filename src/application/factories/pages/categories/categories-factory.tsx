import CategoriesTemplate from '../../../../layout/templates/categories'
import { makeRemoteCreateCategory } from '../../usecases/categories/remote-createCategory-factory'
import { makeRemoteDeleteCategories } from '../../usecases/categories/remote-deleteCategory-factory'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'

export const MakeCategoriesPage = () => {
  return (
    <CategoriesTemplate
      remoteCreateCategory={makeRemoteCreateCategory()}
      remoteGetCategories={makeRemoteGetCategories()}
      remoteDeleteCategory={makeRemoteDeleteCategories()}
    />
  )
}
