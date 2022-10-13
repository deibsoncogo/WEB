import { ChatInner } from '../../../../../layout/components/forms/trainings/chat/chatTraining'
import { makeRemoteGetAllChatTraining } from '../../../usecases/chatTraining/remote-getAllChatTraining-factory'
import { makeRemoteJoinTrainingChatRoom } from '../../../usecases/chatTraining/remote-joinTrainingChatRoom-factory'
import { makeRemoteUploadFileChatTraining } from '../../../usecases/chatTraining/remote-uploadFileChatTraining-factory'

export const MakeChatTrainingInner = () => {
  return (
    <ChatInner
      getAllChatTraining={makeRemoteGetAllChatTraining()}
      remoteJoinChat={makeRemoteJoinTrainingChatRoom()}
      remoteUploadFile={makeRemoteUploadFileChatTraining()}
    />
  )
}
