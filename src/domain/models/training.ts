import { IStreaming } from './streaming'

export interface ITraining {
  id?: string
  name: string
  photo?: Blob
  imageUrl: string
  categoryId: string
  teacherId: string
  teacher: {
    id: string
    name: string
  }
  active: boolean
  price: number
  discount: number
  description: string
  trainingEndDate: Date
  deactiveChatDate: Date
  streamings: IStreaming[]
}
