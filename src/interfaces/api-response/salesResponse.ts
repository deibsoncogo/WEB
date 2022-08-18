import { ICartResponse } from './cartResponse';
import { IPartialProductResponse } from './productsPartialResponse';
  export interface ISalesResponse {
    id: string
    type: string
    status: string
    createdAt: string
    cart: ICartResponse
    products: IPartialProductResponse[]
  }
  