import { FormCreateCourse } from '../../../../layout/components/forms/course/create'
import { makeRemoteGetCategories } from '../../usecases/categories/remote-getCategories-factory'

import { makeRemoteCreateCourse } from '../../usecases/course/remote-createCourse-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'

export const MakeFormCreateCourse = () => {
  return (
    <FormCreateCourse
      createCourse={makeRemoteCreateCourse()}
      getCategories={makeRemoteGetCategories()}
      getUsers={makeRemoteGetAllUsers()}
    />
  )
}
