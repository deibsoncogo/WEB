import { ITraining } from '../../domain/models/training'

interface ITrainingsResponse {
  data: ITraining[]
  page: string | number
  total: 6
  take: string | number
}
