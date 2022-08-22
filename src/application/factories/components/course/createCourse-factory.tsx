import { FormCreateCourse } from '../../../../layout/components/forms/course/create/create'

import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteCreateCourse } from '../../usecases/course/remote-createCourse-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'

export const MakeFormCreateCourse = () => {
  return (
    <FormCreateCourse
      createCourse={makeRemoteCreateCourse()}
      getCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
      getUsers={makeRemoteGetAllUsers()}
    />
  )
}
