import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialCourseResponse } from "../../../../interfaces/api-response/coursePartialResponse";
import { Course } from "../../../../interfaces/model/Course";
import { InputPagination } from "../../../shared/interface/InputPagination";


export interface GetCoursesParams extends InputPagination {
  name: string  
}

export interface IGetAllCourses {
    getAll:(params: GetCoursesParams) => Promise<apiPaginationResponse<IPartialCourseResponse>>
}

