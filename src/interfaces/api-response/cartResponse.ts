import { IUserPartialResponse } from './userPartialResponse';
export interface ICartResponse {
    id: string
    subtotal: number
    total: number
    user: IUserPartialResponse
}
  