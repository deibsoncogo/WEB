import { Course } from '../../interfaces/model/Course'
import { IBook } from './book'
import { Product } from './product'
import { IRoom } from './room'
import { ITraining } from './training'

export interface IFreePlan {
  id?: string
  name: string
  image?: Blob
  imageUrl?: string
  imageKey?: string
  description: string
  price: number
  isActive: boolean
  contentAccessDays: number
  trainings?: ITraining[]
  courses?: Course[]
  books?: IBook[]
  rooms?: IRoom[]
  product?: Product
  categoryId: string
  level: string
}
