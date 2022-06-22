import { IChatRoom } from './../../../../interfaces/api-response/chatRoomResponse';


export interface GetChatRoomParam{
  roomId: string  
}

export interface IGetAllChatRooms {
    getAll:(params: GetChatRoomParam) => Promise<IChatRoom[]>
}

