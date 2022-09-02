import { IChatMessage } from './chatMessage'

export interface IChatRoom extends IChatMessage {
  roomId: string
}
