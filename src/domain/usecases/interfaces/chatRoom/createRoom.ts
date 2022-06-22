import { CreateChatRoom } from "../../../models/createChatRoom";





export interface ICreateChatRoom {
    create:(chatRoom: CreateChatRoom) => Promise<boolean>
}