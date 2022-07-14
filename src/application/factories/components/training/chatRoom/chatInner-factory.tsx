import { ChatInner } from "../../../../../layout/components/forms/trainings/chat/chatTraining"
import { makeRemoteCreateChatTraining } from "../../../usecases/chatTraining/remote-createChatTraining-factory"
import { makeRemoteGetAllChatTraining } from "../../../usecases/chatTraining/remote-getAllChatTraining-factory"


export const MakeChatTrainingInner = () => {
    return <ChatInner getAllChatTraining = {makeRemoteGetAllChatTraining()} createChatTraining = {makeRemoteCreateChatTraining()}/>
  }
  