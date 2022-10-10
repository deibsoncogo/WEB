import { ChatInner } from '../../../../../layout/components/forms/room/chat/chatRoom'
import { makeRemoteGetAllChatRooms } from '../../../usecases/chatRoom/remote-getAllChatRooms-factory'
import { makeRemoteJoinChatRoom } from '../../../usecases/chatRoom/remote-joinChatRoom-factory'
import { makeRemoteUploadFileChatRoom } from '../../../usecases/chatRoom/remote-uploadFileChatRoom-factory'

export const MakeChatRoomInner = () => {
  return (
    <ChatInner
      getAllChatRooms={makeRemoteGetAllChatRooms()}
      remoteJoinChat={makeRemoteJoinChatRoom()}
      remoteUploadFile={makeRemoteUploadFileChatRoom()}
    />
  )
}
