import { Product } from "../../domain/models/product";

export interface IGrantedProductsResponse {
  id?: string;
  userId?: string;
  productId: string;
  expireDate: string
  product: Product
}