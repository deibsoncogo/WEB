import { IChatTraining } from '../../../models/createChatTraining'

export interface GetChatTrainingParam {
  trainingId: string
}

export interface IGetAllChatTrainingResponse {
  data: IChatTraining[]
  existsNewViewedMessages: boolean
}

export interface IGetAllChatTraining {
  getAll: (params: GetChatTrainingParam) => Promise<IGetAllChatTrainingResponse>
}
