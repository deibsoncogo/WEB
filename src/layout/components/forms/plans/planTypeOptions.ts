import { PlanType } from '../../../../domain/models/plan'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'

export const planTypeOptions: ISelectOption[] = [
  { label: 'Pagamento Único', value: PlanType.SINGLE_PAYMENT },
  { label: 'Pagamento Recorrente', value: PlanType.RECURRING_PAYMENT },
]
