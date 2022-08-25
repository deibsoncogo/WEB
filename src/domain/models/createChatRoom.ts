import { MessageType } from './messageType'

export interface IChatRoom {
  id?: string
  roomId: string
  fileURL: string
  text: string
  hour: string
  date: string
  messageType: MessageType
}
