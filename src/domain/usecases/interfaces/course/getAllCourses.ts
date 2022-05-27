import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialCourseResponse } from "../../../../interfaces/api-response/courseResponse";


export interface IGetAllCourses {
    getAll:() => Promise<apiPaginationResponse<IPartialCourseResponse>>
}

