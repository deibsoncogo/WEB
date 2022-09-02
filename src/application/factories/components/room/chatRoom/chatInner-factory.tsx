import { ChatInner } from '../../../../../layout/components/forms/room/chat/chatRoom'
import { makeRemoteGetAllChatRooms } from '../../../usecases/chatRoom/remote-getAllChatRooms-factory'

export const MakeChatRoomInner = () => {
  return <ChatInner getAllChatRooms={makeRemoteGetAllChatRooms()} />
}
