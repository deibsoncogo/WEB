import { MessageType } from './messageType'

export interface IChatMessage {
  id?: string
  fileURL: string
  fileType?: string
  mimeType?: string
  fileOriginalName?: string
  text: string
  hour: string
  date: string
  messageType: MessageType
}
