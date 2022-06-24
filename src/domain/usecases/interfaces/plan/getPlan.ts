import { IPlan } from '../../../models/plan'

export type IGetPlanParams = {
  id: string
}

export interface IGetPlan {
  get: (params: IGetPlanParams) => Promise<IPlan>
}
