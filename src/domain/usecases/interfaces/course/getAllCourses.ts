import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialCourseResponse } from "../../../../interfaces/api-response/coursePartialResponse";
import { Course } from "../../../../interfaces/model/Course";


export interface GetCoursesParams {
    filters?: Partial<Course>
    take: number
    page: number
  }

export interface IGetAllCourses {
    getAll:(params: GetCoursesParams) => Promise<apiPaginationResponse<IPartialCourseResponse>>
}

