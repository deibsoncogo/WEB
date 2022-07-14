import { IChatTraining } from "../../../models/createChatTraining"


export interface GetChatTrainingParam{
  trainingId: string  
}

export interface IGetAllChatTraining {
    getAll:(params: GetChatTrainingParam) => Promise<IChatTraining[]>
}

