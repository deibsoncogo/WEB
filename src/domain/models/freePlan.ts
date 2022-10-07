import { Course } from '../../interfaces/model/Course'
import { ITraining } from './training'
import { IBook } from './book'
import { IRoom } from './room'
import { Product } from './product'
import { ICategory } from '../../interfaces/api-response/categoryResponse'

export interface IFreePlan {
  id?: string
  name: string
  image?: Blob
  imageUrl?: string
  imageKey?: string
  description: string
  price: number
  installments?: number
  isActive: boolean
  trainings?: ITraining[]
  courses?: Course[]
  books?: IBook[]
  rooms?: IRoom[]
  product?: Product
  categoryId: string
  category: ICategory
}
