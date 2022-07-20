import { INotification } from './../../../models/notification';


export interface IUpdateNotification{
    update:(updateNotification: INotification) => Promise<string>
}