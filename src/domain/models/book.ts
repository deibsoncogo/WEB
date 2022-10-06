export interface IBook {
  id: string
  name: string
  imageUrl: string
  image: Blob
  description: string
  price: number
  author: string
  discount: number
  stock: number
  isActive: boolean
  belongsToPlans: boolean
  installments: number
  level: string
}
