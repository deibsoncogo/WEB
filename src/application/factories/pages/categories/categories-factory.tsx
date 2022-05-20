import CategoriesTemplate from '../../../../layout/templates/categories'
import { makeRemoteCreateCategory } from '../../usecases/remote-createCategory-factory'

export const MakeCategoriesPage = () => {
  return <CategoriesTemplate remoteCreateCategory={makeRemoteCreateCategory()} />
}
