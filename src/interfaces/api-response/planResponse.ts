export enum PlanType {
  SINGLE_PAYMENT = 'single_payment',
  RECURRING_PAYMENT = 'recurring_payment',
  FREE_PLAN = 'free_plan'
}

export interface IPlanResponse {
  id: string
  name: string
  imageUrl?: string
  description: string
  price: number
  intervalPaymentMonths?: number
  installments: number
  intervalAccess: number
  isActive: boolean
  isDeleted: boolean
  planType: PlanType
}
