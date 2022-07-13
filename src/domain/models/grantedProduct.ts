import { Product } from "./product"

export class GrantedProduct {
  productId: string
  expireDate: Date
  product: Product

  constructor(productId: string, expireDate: Date, product: Product) {
    this.productId = productId
    this.expireDate = expireDate
    this.product = product
  }
}
