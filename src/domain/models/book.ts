export interface IBook {
  id: string
  name: string
  imageUrl: string
  description: string
  price: string
  author: string
  discount: string
  stock: number

  category: {
    id: string
    name: string
    created_at: string
  }
}
