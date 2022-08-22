import { FormUpdateCourse } from '../../../../layout/components/forms/course/edit/edit'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteGetCourse } from '../../usecases/course/remote-getCourse-factory'
import { makeRemoteUpdateCourse } from '../../usecases/course/remote-updateCourse-factory'
import { makeRemoteGetAllAttachmentByCourseId } from '../../usecases/courseAttachment/remote-getAllAttachmentByCourseId-factory'
import { makeRemoteGetAllCourseClassByCourseId } from '../../usecases/courseClass/remote-getAllCourseClassByCourseId-factory'
import { makeRemoteGetAllUsers } from '../../usecases/remote-getAllUsers-factory'

interface Iparam {
  id: string | string[] | undefined
}

export const MakeFormUpdateCourse = (query: Iparam) => {
  return (
    <FormUpdateCourse
      updateCourse={makeRemoteUpdateCourse()}
      getCategoriesNoPagination={makeRemoteGetCategoriesNoPagination()}
      getUsers={makeRemoteGetAllUsers()}
      getAttachments={makeRemoteGetAllAttachmentByCourseId()}
      getCourseClass={makeRemoteGetAllCourseClassByCourseId()}
      id={query.id}
      getCourse={makeRemoteGetCourse()}
    />
  )
}
