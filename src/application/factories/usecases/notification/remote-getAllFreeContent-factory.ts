import { IGetAllNotification } from './../../../../domain/usecases/interfaces/notification/getAllNotification';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';
import { RemoteGetAllNotification } from '../../../../data/usecases/notification/remote-getAllNotification';


export const makeRemoteGetAllNotifiation = (): IGetAllNotification =>
  new RemoteGetAllNotification(makeApiUrl('notification'), makeAxiosHttpClient());
