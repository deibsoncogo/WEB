import { makeAxiosHttpClient } from './../../http/axiosHttpClient-factory';
import { RemoteGetAllCourses } from "../../../../data/usecases/course/remote-getAllCourses";
import { IGetAllCourses } from "../../../../domain/usecases/interfaces/course/getAllCourses";
import { makeApiUrl } from "../../http";


export const makeRemoteGetAllCourses = (): IGetAllCourses =>
  new RemoteGetAllCourses(makeApiUrl('courses'), makeAxiosHttpClient());
