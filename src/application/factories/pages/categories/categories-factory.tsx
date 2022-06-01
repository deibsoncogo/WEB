import CategoriesTemplate from '../../../../layout/templates/categories'
import { makeRemoteCreateCategory } from '../../usecases/categories/remote-createCategory-factory'
import { makeRemoteDeleteCategories } from '../../usecases/categories/remote-deleteCategory-factory'
import { makeRemoteExportCategories } from '../../usecases/categories/remote-exportCategories-factory'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'
import { makeRemoteUpdateCategory } from '../../usecases/categories/remote-updateCategory-factory'

export const MakeCategoriesPage = () => {
  return (
    <CategoriesTemplate
      remoteCreateCategory={makeRemoteCreateCategory()}
      remoteGetCategories={makeRemoteGetCategories()}
      remoteDeleteCategory={makeRemoteDeleteCategories()}
      remoteUpdateCategory={makeRemoteUpdateCategory()}
      remoteExportCategoires={makeRemoteExportCategories()}
    />
  )
}
