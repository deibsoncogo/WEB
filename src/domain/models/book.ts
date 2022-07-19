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
  categoryId: string

  category: {
    id: string
    name: string
    created_at: string
  }
}
