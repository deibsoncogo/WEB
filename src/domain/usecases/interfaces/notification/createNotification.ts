import { INotification } from './../../../models/notification';



export interface ICreateNotification {
    create:(createNotification: INotification) => Promise<boolean>
}