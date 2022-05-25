import { ICourseResponse } from "../../../../interfaces/api-response/courseResponse";


export interface IGetAllCourses {
    getAll:() => Promise<ICourseResponse[]>
}

