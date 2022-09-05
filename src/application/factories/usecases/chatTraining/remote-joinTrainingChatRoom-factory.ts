import { RemoteJoinTrainingChatRoom } from '../../../../data/usecases/chatTraining/remote-joinTrainingChatRoom'
import { IJoinTrainingChatRoom } from '../../../../domain/usecases/interfaces/chatTraining/joinTrainingChatRoom'
import { makeApiUrl } from '../../http/apiUrl-factory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteJoinTrainingChatRoom = (): IJoinTrainingChatRoom =>
  new RemoteJoinTrainingChatRoom(makeApiUrl('/chatTraining/join'), makeAxiosHttpClient())
