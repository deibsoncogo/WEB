import { RemoteJoinNotification } from '../../../../data/usecases/notification/remote-joinNotification'
import { IJoinNotification } from '../../../../domain/usecases/interfaces/notification/join-notification'
import { makeApiUrl } from '../../http/apiUrl-factory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteJoinNotification = (): IJoinNotification =>
  new RemoteJoinNotification(
    makeApiUrl('/notification/join'),
    makeAxiosHttpClient()
  )
