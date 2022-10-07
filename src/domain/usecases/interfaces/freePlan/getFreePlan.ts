import { IFreePlan } from '../../../models/freePlan'

export type IGetFreePlanParams = {
  id: string
}

export interface IGetFreePlan {
  get: (params: IGetFreePlanParams) => Promise<IFreePlan>
}
