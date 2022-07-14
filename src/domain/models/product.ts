export enum ProductType {
  Book = 'book',
  Course = 'course',
  Plan = 'plan',
  Training = 'training',
}

export class Product {
  id?: string;
  name: string;
  type: ProductType;
  isAvailable?: boolean;
  price?: number;

  constructor(name: string, type: ProductType, isAvailable: boolean, price: number, id?: string) {
    this.id = id
    this.name = name
    this.type = type
    this.isAvailable = isAvailable
    this.price = price
  }
}
