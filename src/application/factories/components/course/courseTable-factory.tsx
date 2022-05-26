import CoursesTable from "../../../../layout/components/tables/courses-list"
import { makeRemoteDeleteCourse } from "../../usecases/course/remote-deleteCourse-factory"
import { makeRemoteGetAllCourses } from "../../usecases/course/remote-getAllCourses-factory"

export const MakeCourseTable = () => {
    return <CoursesTable getAllCourses={makeRemoteGetAllCourses()} deleteCourse = {makeRemoteDeleteCourse()}/>
  }
  