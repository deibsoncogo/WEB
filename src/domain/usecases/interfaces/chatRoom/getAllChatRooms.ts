import { IChatRoom } from '../../../models/createChatRoom'

export interface GetChatRoomParam {
  roomId: string
}

export interface IGetAllChatRoomsResponse {
  data: IChatRoom[]
  existsNewViewedMessages: boolean
}
export interface IGetAllChatRooms {
  getAll: (params: GetChatRoomParam) => Promise<IGetAllChatRoomsResponse>
}
