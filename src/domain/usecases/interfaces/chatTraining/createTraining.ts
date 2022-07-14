import { IChatTraining } from "../../../models/createChatTraining";


export interface ICreateChatTraining {
    create:(chatTraining: IChatTraining) => Promise<boolean>
}