import { Product } from "./product"

export class GrantedProduct {
  id?: string
  productId: string
  expireDate: Date
  product: Product

  constructor(id: string, productId: string, expireDate: Date, product: Product) {
    this.id = id
    this.productId = productId
    this.expireDate = expireDate
    this.product = product
  }
}
