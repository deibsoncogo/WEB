import { FormCreateCourse } from '../../../../layout/components/forms/course/create/create'
import { makeRemoteCreateCourse } from '../../usecases/course/remote-createCourse-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'

export const MakeFormCreateCourse = () => {
  return (
    <FormCreateCourse
      createCourse={makeRemoteCreateCourse()}
      getUsers={makeRemoteGetAllUsers()}
    />
  )
}
