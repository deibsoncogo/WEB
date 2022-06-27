import { IChatRoom } from "../../../models/createChatRoom";


export interface ICreateChatRoom {
    create:(chatRoom: IChatRoom) => Promise<boolean>
}