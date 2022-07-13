export enum ProductType {
  Book = 'book',
  Course = 'course',
  Plan = 'plan',
  Training = 'training',
}

export class Product {
  name: string;
  type: ProductType;
  isAvailable?: boolean;
  price?: number;

  constructor(name: string, type: ProductType, isAvailable: boolean, price: number) {
    this.name = name
    this.type = type
    this.isAvailable = isAvailable
    this.price = price
  }
}
