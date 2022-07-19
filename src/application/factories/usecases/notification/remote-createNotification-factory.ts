import { RemoteCreateNotification } from './../../../../data/usecases/notification/remote-createNotification';
import { ICreateNotification } from './../../../../domain/usecases/interfaces/notification/createNotification';
import { makeApiUrl, makeAxiosHttpClient } from "../../http";



export const makeRemoteCreateNotification = (): ICreateNotification =>
     new RemoteCreateNotification(makeApiUrl('notification'), makeAxiosHttpClient());