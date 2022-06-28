import { FormUpdateCourse } from '../../../../layout/components/forms/course/edit/edit'
import { makeRemoteGetCategoriesNoPagination } from '../../usecases/categories/remote-getCategoriesNoPagination-factory'
import { makeRemoteGetCourse } from '../../usecases/course/remote-getCourse-factory'
import { makeRemoteUpdateCourse } from '../../usecases/course/remote-updateCourse-factory'
import { makeRemoteGetAllAttachmentByCourseId } from '../../usecases/courseAttachment/remote-getAllAttachmentByCourseId-factory'
import { makeRemoteGetAllCourseClassByCourseId } from '../../usecases/courseClass/remote-getAllCourseClassByCourseId-factory'
import { makeRemoteGetAllUsersByRole } from '../../usecases/remote-getAllUsersByRole-factory'

interface param {
  id: string | string[] | undefined
}

export const MakeFormUpdateCourse = (query: param) => {
  return (
    <FormUpdateCourse
      updateCourse={makeRemoteUpdateCourse()}
      getCategories={makeRemoteGetCategoriesNoPagination()}
      getUsers={makeRemoteGetAllUsersByRole()}
      getAttachments={makeRemoteGetAllAttachmentByCourseId()}
      getCourseClass={makeRemoteGetAllCourseClassByCourseId()}
      id={query.id}
      getCourse={makeRemoteGetCourse()}
    />
  )
}
