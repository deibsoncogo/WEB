export interface IBookResponse {
  id: string
  name: string
  imageUrl: string
  description: string
  price: string
  author: string
  discount: string
  stock: number
  isActive: boolean

  category: {
    id: string
    name: string
    created_at: string
  }
}
