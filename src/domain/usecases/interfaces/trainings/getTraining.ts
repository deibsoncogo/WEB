import { ITraining } from '../../../models/training'

export type IGetTrainingParams = {
  id: string
}

export interface IGetTraining {
  get: (params: IGetTrainingParams) => Promise<ITraining>
}
