import CoursesTable from '../../../../layout/components/tables/courses-list'
import { makeRemoteDeleteCourse } from '../../usecases/course/remote-deleteCourse-factory'
import { makeRemoteGetAllCourses } from '../../usecases/course/remote-getAllCourses-factory'
import { makeRemoteGetAllTeacherCourses } from '../../usecases/course/remote-getAllTeacherCourses-factory'
import { makeRemoteGetCourse } from '../../usecases/course/remote-getCourse-factory'
import { makeRemoteUpdateCourse } from '../../usecases/course/remote-updateCourse-factory'

export const MakeCourseTable = () => {
  return (
    <CoursesTable
      getAllCourses={makeRemoteGetAllCourses()}
      getAllTeacherCourses={makeRemoteGetAllTeacherCourses()}
      deleteCourse={makeRemoteDeleteCourse()}
      updateCourse={makeRemoteUpdateCourse()}
    />
  )
}
