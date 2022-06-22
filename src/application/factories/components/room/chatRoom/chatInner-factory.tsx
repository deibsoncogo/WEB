import { ChatInner } from "../../../../../layout/components/forms/room/chat/chatRoom"
import { makeRemoteCreateChatRoom } from "../../../usecases/chatRoom/remote-createChatRoom-factory"
import { makeRemoteGetAllChatRooms } from "../../../usecases/chatRoom/remote-getAllChatRooms-factory"


export const MakeChatRoomInner = () => {
    return <ChatInner getAllChatRooms = {makeRemoteGetAllChatRooms()} createChatRoom = {makeRemoteCreateChatRoom()}/>
  }
  