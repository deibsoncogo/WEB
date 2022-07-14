import { IChatRoom } from "../../../models/createChatRoom"


export interface GetChatRoomParam{
  roomId: string  
}

export interface IGetAllChatRooms {
    getAll:(params: GetChatRoomParam) => Promise<IChatRoom[]>
}

