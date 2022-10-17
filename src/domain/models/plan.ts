import { Category } from '../../interfaces/model/Category'
import { Course } from '../../interfaces/model/Course'
import { IBook } from './book'
import { Product } from './product'
import { IRoom } from './room'
import { ITraining } from './training'

export enum PlanType {
  SINGLE_PAYMENT = 'single_payment',
  RECURRING_PAYMENT = 'recurring_payment',
  FREE_PLAN = 'free_plan',
}

export type AllPlanOptions =
  | PlanType.FREE_PLAN
  | PlanType.RECURRING_PAYMENT
  | PlanType.SINGLE_PAYMENT
  | 'all'
  | 'onlyPaid'

export interface IPlan {
  id?: string
  name: string
  image?: Blob
  imageUrl?: string
  imageKey?: string
  description: string
  price: number
  installments?: number
  intervalAccess: number
  intervalPaymentMonths?: number
  isActive: boolean
  planType: PlanType
  trainings?: ITraining[]
  courses?: Course[]
  books?: IBook[]
  rooms?: IRoom[]
  product?: Product
  category: Category
  categoryId: string
}
