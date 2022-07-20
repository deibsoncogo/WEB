

export enum NotificationType {
  GENERAL = 'Geral',
  SUBSCRIBER = 'Assinantes',
}

export interface INotification {
  id?: string
  tag: string
  text: string
  date: string
  isActive?: boolean
  notificationType: string  
}
