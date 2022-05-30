import { IPartialCourseResponse } from "../../../../interfaces/api-response/courseResponse";


export interface IGetAllCourses {
    getAll:() => Promise<IPartialCourseResponse[]>
}

