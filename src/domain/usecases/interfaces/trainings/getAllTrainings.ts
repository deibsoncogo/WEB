import { ITrainingsResponse } from '../../../../interfaces/api-response/trainingsResponse'
import { ITraining } from '../../../models/training'
import { InputPagination } from '../../../shared/interface/InputPagination'
import { OutputPagination } from '../../../shared/interface/OutputPagination'

export interface IGetAllTrainingsParams extends InputPagination {
  name?: string
}
export interface IGetAllTrainings {
  getAll: (params: IGetAllTrainingsParams) => Promise<OutputPagination<ITraining>>
}
