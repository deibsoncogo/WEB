import { IStreaming } from './streaming'

export interface ITraining {
  id: string
  name: string
  image: Blob
  zoomUserId: string
  zoomUserName: string
  imageUrl: string
  level: string
  teacherId: string
  teacher: { id: string, name: string }
  belongsToPlans: boolean
  isActive: boolean
  price: number
  discount: number
  description: string
  trainingEndDate: string
  deactiveChatDate: string
  installments: number
  streamings: IStreaming[]
}
