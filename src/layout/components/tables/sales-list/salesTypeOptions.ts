import { StatusSaleType } from "../../../../domain/models/statusSale";
import { ISelectOption } from "../../../../domain/shared/interface/SelectOption";


export const salesTypeOptions: ISelectOption[] = [
  { label: 'Aguardando pagamento', value: StatusSaleType.PENDING},
  { label: 'Pago', value:  StatusSaleType.PAID },
  { label: 'Cancelado', value: StatusSaleType.CANCELED },
  { label: 'Em andamento', value: StatusSaleType.PROCESSING }, 
  { label: 'Negado', value:  StatusSaleType.FAILED }, 
  { label: 'Reembolsado', value: StatusSaleType.CHARGEBACK }, 
 
]
