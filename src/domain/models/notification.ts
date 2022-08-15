

export enum NotificationType {
  GENERAL = 'Geral',
  SUBSCRIBER = 'Assinantes',
}

export interface INotification {
  id?: string
  tag: string
  text: string
  isActive?: boolean
  notificationType: string  
}
