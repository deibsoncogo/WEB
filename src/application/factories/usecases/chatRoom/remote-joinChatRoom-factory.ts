import { RemoteJoinChatRoom } from '../../../../data/usecases/chatRoom/remote-joinChatRoom'
import { IJoinChatRoom } from '../../../../domain/usecases/interfaces/chatRoom/joinChatRoom'
import { makeApiUrl } from '../../http/apiUrl-factory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteJoinChatRoom = (): IJoinChatRoom =>
  new RemoteJoinChatRoom(makeApiUrl('/chatRoom/join'), makeAxiosHttpClient())
