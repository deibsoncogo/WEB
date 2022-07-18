export enum PlanType {
  SINGLE_PAYMENT = 'single_payment',
  RECURRING_PAYMENT = 'recurring_payment',
}

export interface IPlanResponse {
  id: string
  name: string
  imageUrl?: string
  description: string
  price: number
  intervalPaymentMonths?: number
  installments: number
  intervalAccessMonths: number
  isActive: boolean
  planType: PlanType
}
