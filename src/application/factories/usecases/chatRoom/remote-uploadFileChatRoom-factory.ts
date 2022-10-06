import { RemoteUploadFileChatRoom } from '../../../../data/usecases/chatRoom/remote-uploadFileChatRoom'
import { IUploadFileChatRoom } from '../../../../domain/usecases/interfaces/chatRoom/uploadFileChatRoom'
import { makeApiUrl } from '../../http/apiUrl-factory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteUploadFileChatRoom = (): IUploadFileChatRoom =>
  new RemoteUploadFileChatRoom(makeApiUrl('/chatRoom/uploadFile'), makeAxiosHttpClient())
