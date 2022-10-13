import { RemoteUploadFileChatTraining } from '../../../../data/usecases/chatTraining/remote-uploadFileChatTraining'
import { IUploadFileChatTraining } from '../../../../domain/usecases/interfaces/chatTraining/uploadFileChatTraining'
import { makeApiUrl } from '../../http/apiUrl-factory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClient-factory'

export const makeRemoteUploadFileChatTraining = (): IUploadFileChatTraining =>
  new RemoteUploadFileChatTraining(makeApiUrl('/chatTraining/uploadFile'), makeAxiosHttpClient())
