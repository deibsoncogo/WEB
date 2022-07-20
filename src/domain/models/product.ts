import { IBookResponse } from '../../interfaces/api-response/bookResponse'
import { ICourseResponse } from '../../interfaces/api-response/courseResponse'
import { IPlanResponse } from '../../interfaces/api-response/planResponse'
import { ITrainingResponse } from '../../interfaces/api-response/trainingResponse'

export enum ProductType {
  Book = 'book',
  Course = 'course',
  Plan = 'plan',
  Training = 'training',
}

export class Product {
  id?: string
  name: string
  type: ProductType
  isAvailable?: boolean
  price: number
  book?: IBookResponse
  course?: ICourseResponse
  plan?: IPlanResponse
  training?: ITrainingResponse

  constructor(
    name: string,
    type: ProductType,
    isAvailable: boolean,
    price: number,
    id?: string,
    book?: IBookResponse,
    course?: ICourseResponse,
    plan?: IPlanResponse,
    training?: ITrainingResponse
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.isAvailable = isAvailable
    this.price = price
    this.book = book
    this.course = course
    this.plan = plan
    this.training = training
  }
}
