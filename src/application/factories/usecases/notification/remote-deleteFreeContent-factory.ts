import { IDeleteNotification } from './../../../../domain/usecases/interfaces/notification/deleteNotification';
import { RemoteDeleteNotification } from './../../../../data/usecases/notification/remote-deleteNotification';
import { makeApiUrl, makeAxiosHttpClient } from "../../http";

export const makeRemoteDeleteNotification = (): IDeleteNotification =>
  new RemoteDeleteNotification(makeApiUrl(`notification`), makeAxiosHttpClient())
