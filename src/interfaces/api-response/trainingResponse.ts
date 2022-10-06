export interface ITrainingResponse {
  id: string
  name: string
  imageUrl: string
  price: number
  discount: number
  description: string
  level: string
  teacherId: string
  trainingEndDate: Date
  deactiveChatDate: Date
  isActive: boolean
  installments: number
  zoomUserId: string
}
