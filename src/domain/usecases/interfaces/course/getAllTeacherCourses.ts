import { IPartialCourseResponse } from "../../../../interfaces/api-response/coursePartialResponse";
import { InputPagination } from "../../../shared/interface/InputPagination";
import { OutputPagination } from "../../../shared/interface/OutputPagination";


export interface GetCourseParams extends InputPagination {
  name?: string,
}

export interface IGetAllTeacherCourses {
  getAll:(params: GetCourseParams, userId: string ) => Promise<OutputPagination<IPartialCourseResponse>>
}
