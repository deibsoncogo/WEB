import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import { Socket } from 'socket.io-client'
import { MessageType } from '../../../../../../domain/models/messageType'
import { SocketTrainingEvents } from '../../../../../../domain/models/socketTrainingEvents'
import { formatDate, formatTime } from '../../../../../../helpers'

type ISendMessageProps = {
  message: string
  trainingId: string
  socket: Socket | null
  setMessage: Dispatch<SetStateAction<string>>
  setLoadingSendMessage: Dispatch<SetStateAction<boolean>>
}

export function sendMessage({
  message,
  setLoadingSendMessage,
  setMessage,
  socket,
  trainingId,
}: ISendMessageProps) {
  try {
    setLoadingSendMessage(true)
    const currentDateMessage = new Date()
    const chatMessage = {
      trainingId,
      text: message,
      date: formatDate(currentDateMessage, 'YYYY-MM-DD'),
      hour: formatTime(currentDateMessage, 'HH:mm:ss'),
      messageType: MessageType.Text,
    }

    socket?.emit(SocketTrainingEvents.CreateMessage, chatMessage, () => {
      setMessage('')
      setLoadingSendMessage(false)
    })
  } catch {
    toast.error('Não foi possível enviar a mensagem!')
  }
}
