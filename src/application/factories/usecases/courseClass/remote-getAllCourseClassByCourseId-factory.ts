import { RemoteGetAllCourseClassByCourseId } from "../../../../data/usecases/courseClass/remote-getAllCourseClassByCourseId";
import { IGetAllCourseClassByCourseId } from "../../../../domain/usecases/interfaces/courseClass/getAllCourseClassByCourseId";
import { makeApiUrl, makeAxiosHttpClient } from "../../http";


export const makeRemoteGetAllCourseClassByCourseId = (): IGetAllCourseClassByCourseId =>
  new RemoteGetAllCourseClassByCourseId(makeApiUrl('/courseClass/getAllCourseClass'), makeAxiosHttpClient());
