
import { RemoteGetCourse } from '../../../../data/usecases/course/remote-getCourse';
import { IGetCourse } from '../../../../domain/usecases/interfaces/course/getCourse';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';



export const makeRemoteGetCourse = (id: any): IGetCourse =>
  new RemoteGetCourse(makeApiUrl(`/courses/${id}`), makeAxiosHttpClient());