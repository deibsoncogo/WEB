import CoursesTable from "../../../../layout/components/tables/courses-list"
import { makeRemoteGetAllCourses } from "../../usecases/course/remote-getAllCourses-factory"

export const MakeCourseTable = () => {
    return <CoursesTable getAllCourses={makeRemoteGetAllCourses()} />
  }
  