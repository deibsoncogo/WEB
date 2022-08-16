import { ICartResponse } from './cartResponse';
  export interface ISalesResponse {
    id: string
    type: string
    status: string
    createdAt: string
    cart: ICartResponse
  }
  