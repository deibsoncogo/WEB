import CoursesTable from "../../../../layout/components/tables/courses-list"
import { makeRemoteDeleteCourse } from "../../usecases/course/remote-deleteCourse-factory"
import { makeRemoteGetAllCourses } from "../../usecases/course/remote-getAllCourses-factory"
import { makeRemoteGetCourse } from "../../usecases/course/remote-getCourse-factory"
import { makeRemoteUpdateCourse } from "../../usecases/course/remote-updateCourse-factory"

export const MakeCourseTable = () => {
    return <CoursesTable getAllCourses={makeRemoteGetAllCourses()} deleteCourse = {makeRemoteDeleteCourse()}
    updateCourse = {makeRemoteUpdateCourse()}
    getCourse = {makeRemoteGetCourse()}/>
  }
  