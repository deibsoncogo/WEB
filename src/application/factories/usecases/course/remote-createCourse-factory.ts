
import { RemoteCreateCourse } from '../../../../data/usecases/course/remote-createCourse';
import { ICreateCourse } from '../../../../domain/usecases/interfaces/course/createCourse';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';



export const makeRemoteCreateCourse = (): ICreateCourse =>
  new RemoteCreateCourse(makeApiUrl('courses'), makeAxiosHttpClient());