import { ICourseClassResponse } from "../../../../interfaces/api-response/courseClassResponse";

export interface IGetAllCourseClassByCourseId {
    getAllByCourseId:(id: string) => Promise<ICourseClassResponse>
}

