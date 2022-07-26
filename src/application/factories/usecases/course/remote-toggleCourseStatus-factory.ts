import { RemoteToggleCourseStatus } from '../../../../data/usecases/course/remote-toggleCourseStatus'
import { IToggleCourseStatus } from '../../../../domain/usecases/interfaces/course/toggleCourseStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleCourseStatus = (): IToggleCourseStatus =>
  new RemoteToggleCourseStatus(makeApiUrl('/courses/toggleStatus'), makeAxiosHttpClient())
