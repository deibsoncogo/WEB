import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialCourseResponse } from "../../../../interfaces/api-response/coursePartialResponse";


export interface IGetAllCourses {
    getAll:() => Promise<apiPaginationResponse<IPartialCourseResponse>>
}

