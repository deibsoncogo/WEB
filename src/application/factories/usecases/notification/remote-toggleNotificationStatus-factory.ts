import { RemoteToggleNotificationStatus } from './../../../../data/usecases/notification/remote-toggleNotificationStatus';
import { IToggleNotificationStatus } from '../../../../domain/usecases/interfaces/notification/toggleNotificationStatus'
import { makeApiUrl, makeAxiosHttpClient } from '../../http'

export const makeRemoteToggleNotificationStatus = (): IToggleNotificationStatus =>
  new RemoteToggleNotificationStatus(makeApiUrl('/notification/toggleStatus'), makeAxiosHttpClient())
