export class GrantedProduct {
  productId: string
  expireDate: Date

  constructor(productId: string, expireDate: Date) {
    this.productId = productId
    this.expireDate = expireDate
  }
}
