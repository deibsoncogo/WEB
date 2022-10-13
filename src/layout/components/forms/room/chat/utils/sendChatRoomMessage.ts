import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { Socket } from 'socket.io-client'
import { MessageType } from '../../../../../../domain/models/messageType'
import { SocketRoomEvents } from '../../../../../../domain/models/socketRoomEvents'
import { formatDate, formatTime } from '../../../../../../helpers'

type ISendMessageProps = {
  message: string
  roomId: string
  socket: Socket | null
  setMessage: Dispatch<SetStateAction<string>>
  setLoadingSendMessage: Dispatch<SetStateAction<boolean>>
}

export const sendChatRoomMessage = ({
  message,
  roomId,
  setLoadingSendMessage,
  setMessage,
  socket,
}: ISendMessageProps) => {
  try {
    setLoadingSendMessage(true)
    const currentDateMessage = new Date()
    const chatRoom = {
      roomId,
      text: message,
      date: formatDate(currentDateMessage, 'YYYY-MM-DD'),
      hour: formatTime(currentDateMessage, 'HH:mm:ss'),
      messageType: MessageType.Text,
    }

    socket?.emit(SocketRoomEvents.CreateMessage, chatRoom, () => {
      setMessage('')
      setLoadingSendMessage(false)
    })
  } catch {
    toast.error('Não foi possível enviar a mensagem!')
  }
}
