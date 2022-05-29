import { apiPaginationResponse } from "../../../../interfaces/api-response/apiPaginationResponse";
import { IPartialCourseResponse } from "../../../../interfaces/api-response/coursePartialResponse";
import { ICourseResponse } from "../../../../interfaces/api-response/courseResponse";


export interface IGetCourse {
    get:() => Promise<ICourseResponse>
}

