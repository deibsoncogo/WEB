import { IStreaming } from './streaming'

export interface ICreateTrainingParams {
  name: string
  photo?: Blob
  categoryId: string
  teacherId: string
  active: boolean
  price: number
  discount: number
  description: string
  trainingEndDate: Date
  deactiveChatDate: Date
  streamings: IStreaming[]
}

export interface ICreateTraining {
  create: (params: FormData) => Promise<void>
}
