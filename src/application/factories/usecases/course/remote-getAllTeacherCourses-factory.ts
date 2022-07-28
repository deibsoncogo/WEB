import { makeApiUrl, makeAxiosHttpClient } from "../../http";
import { IGetAllTeacherCourses } from "../../../../domain/usecases/interfaces/course/getAllTeacherCourses";
import { RemoteGetAllTeacherCourses } from "../../../../data/usecases/course/remote-getAllTeacherCourses";

export const makeRemoteGetAllTeacherCourses = (): IGetAllTeacherCourses => {
  return new RemoteGetAllTeacherCourses(makeApiUrl('courses'), makeAxiosHttpClient());
}
