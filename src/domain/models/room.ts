export interface IRoom {
  id?: string
  name: string
  description: string
  imageUrl: string
  imageKey?: string
  price: number
  installments: number
  discount: number
  isActive: boolean
  userId: string
  level: string
}
