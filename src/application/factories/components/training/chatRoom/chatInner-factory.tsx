import { ChatInner } from '../../../../../layout/components/forms/trainings/chat/chatTraining'
import { makeRemoteGetAllChatTraining } from '../../../usecases/chatTraining/remote-getAllChatTraining-factory'

export const MakeChatTrainingInner = () => {
  return <ChatInner getAllChatTraining={makeRemoteGetAllChatTraining()} />
}
