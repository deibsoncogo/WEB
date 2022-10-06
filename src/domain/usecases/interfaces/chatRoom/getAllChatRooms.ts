import { IChatRoom } from '../../../models/createChatRoom'

export interface IGetChatAllRoomParam {
  roomId: string
}

export interface IGetAllChatRoomsResponse {
  data: IChatRoom[]
  existsNewViewedMessages: boolean
}
export interface IGetAllChatRooms {
  getAll: (params: IGetChatAllRoomParam) => Promise<IGetAllChatRoomsResponse>
}
