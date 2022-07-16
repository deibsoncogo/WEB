import { INotificationResponse } from './../../../../interfaces/api-response/notificationResponse';
import { InputPagination } from "../../../shared/interface/InputPagination"
import { OutputPagination } from "../../../shared/interface/OutputPagination"



export interface GetNotificationParams extends InputPagination {
  name?: string  
}

export interface IGetAllNotification{
  getAll:(params: GetNotificationParams) => Promise<OutputPagination<INotificationResponse>>
}
