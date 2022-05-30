import { RemoteDeleteCourse } from "../../../../data/usecases/course/remote-deleteCourse";
import { IDeleteCourse } from "../../../../domain/usecases/interfaces/course/deleteCourse";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";



export const makeRemoteDeleteCourse = (): IDeleteCourse =>
  new RemoteDeleteCourse(makeApiUrl(`/courses`), makeAxiosHttpClient())
