import { RemoteUpdateNotification } from './../../../../data/usecases/notification/remote-updateNotification';
import { IUpdateNotification } from './../../../../domain/usecases/interfaces/notification/updateNotification';
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory';
import { makeApiUrl } from '../../http';


export const makeRemoteUpdateNotification = (): IUpdateNotification =>
  new RemoteUpdateNotification(makeApiUrl('notification'), makeAxiosHttpClient());