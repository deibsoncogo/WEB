import { ITrainingsResponse } from '../../../../interfaces/api-response/trainingsResponse'
import { InputPagination } from '../../../shared/interface/InputPagination'

export interface IGetAllTrainingsParams extends InputPagination {
  name: string
}
export interface IGetAllTrainings {
  getAll: (params: IGetAllTrainingsParams) => Promise<ITrainingsResponse>
}
