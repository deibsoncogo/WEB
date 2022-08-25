import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import io from 'socket.io-client'
import { IChatRoom } from '../../../../../domain/models/createChatRoom'
import { MessageType } from '../../../../../domain/models/messageType'
import { IGetAllChatRooms } from '../../../../../domain/usecases/interfaces/chatRoom/getAllChatRooms'
import { formatDate, formatTime, KTSVG } from '../../../../../helpers'
import { extractAPIURL } from '../../../../../utils/extractAPIURL'
import { FullLoading } from '../../../FullLoading/FullLoading'
import { Message } from './message'
const socket = io(`${extractAPIURL(process.env.API_URL)}/room`)

type props = {
  getAllChatRooms: IGetAllChatRooms
}

export function ChatInner({ getAllChatRooms }: props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [chatRoom, setChatRoom] = useState()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { id } = router.query

  const IsPreviousDateDifferentFromCurrent = (index: number) => {
    if (messages?.length > 1 && index >= 1) {
      return messages[index - 1].date !== messages[index]?.date
    }
    return true
  }

  const IsToShowAvatarImage = (index: number) => {
    if (messages?.length > 1 && index >= 1) {
      return messages.length === index - 1
        ? true
        : messages[index].date !== messages[index + 1]?.date
    }
    return messages?.length == 1
  }

  const handleSendMessage = async () => {
    try {
      const currentDateMessage = new Date()
      const chatRoom = {
        roomId: id,
        text: message,
        date: formatDate(currentDateMessage, 'YYYY-MM-DD'),
        hour: formatTime(currentDateMessage, 'HH:mm:ss'),
        messageType: MessageType.Text,
      }

      socket.emit('createMessage', chatRoom, () => {
        setMessage('')
      })
    } catch {
      toast.error('Não foi possível enviar a mensagem!')
    }
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.[0]) {
      const currentDateMessage = new Date()

      const chatRoom = {
        roomId: id,
        date: formatDate(currentDateMessage, 'YYYY-MM-DD'),
        hour: formatTime(currentDateMessage, 'HH:mm:ss'),
        file: event.target.files[0],
        messageType: MessageType.File,
      }

      socket.emit('createMessage', chatRoom, () => {
        setMessage('')
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id == 'string') {
        setMessages(await getAllChatRooms.getAll({ roomId: id }))
      }
    }
    fetchData()
      .catch(() => toast.error('Não foi possível carregar as mensagens'))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((oldState) => [...oldState, message])
    })
  }, [])

  useEffect(() => {
    if (!chatRoom) {
      socket.emit('joinChat', { roomId: id }, (room: any) => setChatRoom(room))
    }
  }, [])

  console.log(messages)

  return (
    <>
      {loading && <FullLoading />}
      <div className='card-body position-relative overflow-auto mh-550px pb-100px'>
        {messages.map((instantMessage, index) => (
          <Message
            key={index}
            message={instantMessage}
            isPreviousDateDifferentFromCurrent={IsPreviousDateDifferentFromCurrent(index)}
            isToShowAvatarImage={IsToShowAvatarImage(index)}
          />
        ))}
      </div>

      <div className='card-footer pt-4 border-top border-gray-600 d-flex align-items-center'>
        <Tooltip content={'Enviar arquivo'} rounded color='primary'>
          <button
            className='btn btn-sm btn-icon btn-active-light-primary'
            type='button'
            onClick={() => inputFileRef.current?.click()}
          >
            <input
              ref={inputFileRef}
              type='file'
              id='file'
              name='file'
              accept='image/png, image/jpeg'
              hidden
              onChange={handleChangeFile}
            />
            <KTSVG path='/icons/com008.svg' className='svg-icon svg-icon-2  svg-icon-primary' />
          </button>
        </Tooltip>
        <textarea
          rows={1}
          value={message}
          placeholder='Escreva uma mensagem'
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary ms-5 me-5'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
          style={{ minHeight: '50px' }}
        />

        <Tooltip content={'Enviar'} rounded color='primary'>
          <button
            type='button'
            title='Enviar'
            className='btn btn-sm btn-icon btn-active-light-primary'
            onClick={handleSendMessage}
          >
            <KTSVG path='/icons/gen016.svg' className='svg-icon svg-icon-2  svg-icon-primary' />
          </button>
        </Tooltip>

        <Tooltip content={'Voltar'} rounded color='primary'>
          <Link href='/rooms'>
            <button className='btn btn-sm btn-icon btn-active-light-primary' type='button'>
              <KTSVG path='/icons/reply.svg' className='svg-icon svg-icon-2 svg-icon-primary ' />
            </button>
          </Link>
        </Tooltip>
      </div>
    </>
  )
}
