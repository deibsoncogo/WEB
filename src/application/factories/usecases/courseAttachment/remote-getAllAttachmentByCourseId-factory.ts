import { makeApiUrl, makeAxiosHttpClient } from '../../http';
import { RemoteGetAllAttachmentCourseByCourseId } from './../../../../data/usecases/courseAttachment/remote-getAllCourseAttachmentByCourseId';
import { IGetAllAttachmentByCourseId } from './../../../../domain/usecases/interfaces/courseAttachment/getAllAttachmentByCourseId';



export const makeRemoteGetAllAttachmentByCourseId = (): IGetAllAttachmentByCourseId =>
  new RemoteGetAllAttachmentCourseByCourseId(makeApiUrl('courseAttachment/getAllAttachment'), makeAxiosHttpClient());
