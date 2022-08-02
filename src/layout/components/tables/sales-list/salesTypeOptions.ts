import { StatusSaleType } from "../../../../domain/models/statusSale";
import { ISelectOption } from "../../../../domain/shared/interface/SelectOption";


export const salesTypeOptions: ISelectOption[] = [
  { label: 'Pago', value:  StatusSaleType.PAID },
  { label: 'Em andamento', value: StatusSaleType.ONGOING },
  { label: 'Aguardando pagamento', value: StatusSaleType.AWAITINGPAYMENT },
  { label: 'Negado', value:  StatusSaleType.DENIED },
  { label: 'Cancelado', value: StatusSaleType.CANCELED },
  { label: 'Reembolsado', value: StatusSaleType.REFUNDED }, 
 
]
