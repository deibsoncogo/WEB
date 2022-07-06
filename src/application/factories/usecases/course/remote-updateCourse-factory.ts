
import { RemoteUpdateCourse } from '../../../../data/usecases/course/remote-updateCourse';
import { IUpdateCourse } from '../../../../domain/usecases/interfaces/course/upDateCourse';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';



export const makeRemoteUpdateCourse = (): IUpdateCourse =>
  new RemoteUpdateCourse(makeApiUrl('courses'), makeAxiosHttpClient());