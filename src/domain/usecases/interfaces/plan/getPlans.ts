import { AllPlanOptions, IPlan } from '../../../models/plan'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetPlansParams extends InputPagination {
  name: string
  planType?: AllPlanOptions
}
export interface IGetPlans {
  get: (params: IGetPlansParams) => Promise<OutputPagination<IPlan[]>>
}
