import { NotificationType } from "../../../../domain/models/notification";
import { ISelectOption } from "../../../../domain/shared/interface/SelectOption";


export const notificationTypeOptions: ISelectOption[] = [
  { label: 'Geral', value: NotificationType.GENERAL },
  { label: 'Assinantes', value: NotificationType.SUBSCRIBER },
]
