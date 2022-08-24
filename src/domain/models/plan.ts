import { Course } from '../../interfaces/model/Course'
import { ITraining } from './training'
import { IBook } from './book'
import { IRoom } from './room'

export enum PlanType {
  SINGLE_PAYMENT = 'single_payment',
  RECURRING_PAYMENT = 'recurring_payment',
}

export interface IPlan {
  id?: string
  name: string
  image?: Blob
  imageUrl?: string
  imageKey?: string
  description: string
  price: number
  intervalPaymentMonths?: number
  installments?: number
  intervalAccessMonths: number
  isActive: boolean
  planType: PlanType
  relatedPlan?: IPlan
  trainings?: ITraining[]
  courses?: Course[]
  books?: IBook[]
  rooms?: IRoom[]
}
