import { MessageType } from './messageType'

export interface IChatRoom {
  id?: string
  roomId: string
  fileURL: string
  fileType?: string
  fileOriginalName?: string
  text: string
  hour: string
  date: string
  messageType: MessageType
}
