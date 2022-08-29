import { IPlan } from '../../../models/plan'

export interface IGetNotRelatedPlans {
  get: () => Promise<IPlan[]>
}
