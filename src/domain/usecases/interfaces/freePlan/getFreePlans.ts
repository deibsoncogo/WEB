import { IFreePlan } from '../../../models/freePlan'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetFreePlansParams extends InputPagination {
  name: string
}
export interface IGetFreePlans {
  get: (params: IGetFreePlansParams) => Promise<OutputPagination<IFreePlan[]>>
}
