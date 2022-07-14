import { Product } from "./product"

export class GrantedProduct {
  id?: string
  productId: string
  expireDate: Date
  product: Product

  constructor(productId: string, expireDate: Date, product: Product, id?: string) {
    this.id = id
    this.productId = productId
    this.expireDate = expireDate
    this.product = product
  }
}
