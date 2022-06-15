import { IStreaming } from './streaming'

export interface ITraining {
  id?: string
  name: string
  photo?: Blob
  zoomUserId: string
  imageUrl: string
  categoryId: string
  category: {
    id: string
    name: string
  }
  teacherId: string
  teacher: {
    id: string
    name: string
  }
  active: boolean
  price: number
  discount: number
  description: string
  trainingEndDate: string
  deactiveChatDate: string
  installments: number
  streamings: IStreaming[]
}
