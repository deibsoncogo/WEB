import { Course } from '../../interfaces/model/Course'
import { ITraining } from './training'

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
  trainings?: ITraining[]
  courses?: Course[]
}
