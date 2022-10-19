import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Socket } from 'socket.io-client'
import { useRequest } from '../../../../../application/hooks/useRequest'
import { IChatRoom } from '../../../../../domain/models/createChatRoom'
import { SocketRoomEvents } from '../../../../../domain/models/socketRoomEvents'
import {
  IGetAllChatRooms,
  IGetAllChatRoomsResponse,
  IGetChatAllRoomParam,
} from '../../../../../domain/usecases/interfaces/chatRoom/getAllChatRooms'
import { IJoinChatRoom } from '../../../../../domain/usecases/interfaces/chatRoom/joinChatRoom'
import { IUploadFileChatRoom } from '../../../../../domain/usecases/interfaces/chatRoom/uploadFileChatRoom'
import { KTSVG } from '../../../../../helpers'
import { debounce } from '../../../../../helpers/debounce'
import { getSocketConnection } from '../../../../../utils/getSocketConnection'
import { ChatMessage } from '../../../chatMessage'
import { FullLoading } from '../../../FullLoading/FullLoading'
import ConfirmationModal from '../../../modal/ConfirmationModal'
import { IsPreviousDateDifferentFromCurrent } from './utils/isPreviousDateDifferentFromCurrent'
import { isToShowAvatarImage } from './utils/isToShowAvatarImage'
import { sendChatRoomMessage } from './utils/sendChatRoomMessage'
import { uploadFileChatRoomMessage } from './utils/uploadFileChatRoomMessage'
let socket: Socket | null

type props = {
  getAllChatRooms: IGetAllChatRooms
  remoteJoinChat: IJoinChatRoom
  remoteUploadFile: IUploadFileChatRoom
}

export function ChatInner({ getAllChatRooms, remoteJoinChat, remoteUploadFile }: props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IChatRoom[]>([])
  const [selectedMessageToDelete, setSelectedMessageToDelete] = useState<string | null>(null)
  const [loadingDeletion, setLoadingDeletion] = useState(false)
  const [loadingSendMessage, setLoadingSendMessage] = useState(false)
  const [isToEmitViewAllMessages, setIsToEmitViewAllMessages] = useState(false)

  const inputFileRef = useRef<HTMLInputElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { id } = router.query

  const {
    makeRequest: getAllChatMessages,
    error: getAllChatMessagesError,
    data: responseGetAllMessages,
    cleanUp: cleanUpGetAllMessages,
    loading: lodingGetAllMessages,
  } = useRequest<IGetAllChatRoomsResponse, IGetChatAllRoomParam>(getAllChatRooms.getAll)

  const { makeRequest: joinChatRoom, data: accessTokenChat } = useRequest<IJoinChatRoom>(
    remoteJoinChat.join
  )

  const {
    makeRequest: uploadFile,
    data: fileUploadSuccess,
    cleanUp: cleanUpFileUpload,
    error: fileUploadError,
  } = useRequest<IChatRoom, FormData>(remoteUploadFile.upload)

  const handleSendMessage = async () => {
    sendChatRoomMessage({ message, setMessage, roomId: String(id), setLoadingSendMessage, socket })
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSetLoadingSendMessage = debounce(() => {
    setLoadingSendMessage(false)
  })

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    setLoadingSendMessage(true)
    uploadFileChatRoomMessage({
      roomId: String(id),
      event,
      uploadFile,
    })

    handleSetLoadingSendMessage()
  }

  const handleDeleteMessage = () => {
    if (selectedMessageToDelete) {
      setLoadingDeletion(true)
      socket?.emit(SocketRoomEvents.DeleteMessage, { id: selectedMessageToDelete }, () => {
        setLoadingDeletion(false)
        setSelectedMessageToDelete(null)
      })
    }
  }

  const handleCloseDeleteConfirmationModal = () => {
    setSelectedMessageToDelete(null)
  }

  const handleSelecMessageToDelete = (messageId: string) => {
    setSelectedMessageToDelete(messageId)
  }

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const socketInitializer = (tokenChat: string) => {
    socket = getSocketConnection(SocketRoomEvents.Room, tokenChat)
    socket.connect()

    socket.on(SocketRoomEvents.ReceiveMessage, (message) => {
      setMessages((oldState) => [...oldState, message])
      socket?.emit(SocketRoomEvents.ViewMessage, { messageId: message.id })
    })

    socket.on(SocketRoomEvents.DeletedMessage, (deletedMessage) => {
      setMessages((oldState) => oldState.filter((message) => message.id !== deletedMessage.id))
    })

    socket.on(SocketRoomEvents.UpdateMessageViews, (updatedMessages) => {
      setMessages(() => updatedMessages)
    })

    socket.on(SocketRoomEvents.ConnectError, () => {
      toast.error('Falha ao se conectar com o servidor!')
    })
  }

  useEffect(() => {
    getAllChatMessages({ roomId: String(id) })
    joinChatRoom({ roomId: id })
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (messages.length > 0) {
      timeout = setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [messages])

  useEffect(() => {
    if (responseGetAllMessages) {
      const { data, existsNewViewedMessages } = responseGetAllMessages
      setMessages(data)

      if (existsNewViewedMessages) {
        setIsToEmitViewAllMessages(true)
      }

      cleanUpGetAllMessages()
    }
  }, [responseGetAllMessages])

  useEffect(() => {
    if (fileUploadSuccess) {
      setLoadingSendMessage(false)
      socket?.emit(SocketRoomEvents.ReceivedFileUploaded, {
        roomChatMessageId: fileUploadSuccess.id,
      })
      cleanUpFileUpload()
    }
  }, [fileUploadSuccess])

  useEffect(() => {
    if (fileUploadError) {
      toast.error(fileUploadError)
      cleanUpFileUpload()
      return
    }

    if (getAllChatMessagesError) {
      toast.error(getAllChatMessagesError)
      cleanUpGetAllMessages()
    }
  }, [fileUploadError, getAllChatMessagesError])

  useEffect(() => {
    if (isToEmitViewAllMessages && socket) {
      socket.emit(SocketRoomEvents.ViewAllMessages)
    }
  }, [isToEmitViewAllMessages, socket])

  useEffect(() => {
    if (!socket && accessTokenChat) {
      socketInitializer(String(accessTokenChat))
    }
    return () => {
      if (socket) {
        socket.removeAllListeners(SocketRoomEvents.ReceiveMessage)
        socket.removeAllListeners(SocketRoomEvents.DeletedMessage)
        socket.removeAllListeners(SocketRoomEvents.UpdateMessageViews)
        socket.removeAllListeners(SocketRoomEvents.UpdateMessageViews)
        socket.removeAllListeners(SocketRoomEvents.ConnectError)
        socket.disconnect()
        socket = null
      }
    }
  }, [accessTokenChat])

  return (
    <div>
      <ConfirmationModal
        isOpen={!!selectedMessageToDelete}
        loading={loadingDeletion}
        onRequestClose={handleCloseDeleteConfirmationModal}
        onConfimation={handleDeleteMessage}
        content='Você tem certeza que deseja excluir esta mensagem?'
        title='Excluir'
      />

      {lodingGetAllMessages && <FullLoading />}
      <div className='card-body position-relative overflow-auto mh-550px'>
        {messages.map((instantMessage, index) => (
          <ChatMessage
            key={index}
            message={instantMessage}
            isPreviousDateDifferentFromCurrent={IsPreviousDateDifferentFromCurrent(index, messages)}
            isToShowAvatarImage={isToShowAvatarImage(index, messages)}
            setSelectedMessageToDelete={handleSelecMessageToDelete}
          />
        ))}
        <div ref={lastMessageRef} itemType='hidden' />
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
              hidden
              onChange={handleChangeFile}
              disabled={loadingSendMessage}
            />
            <KTSVG path='/icons/com008.svg' className='svg-icon svg-icon-2  svg-icon-primary' />
          </button>
        </Tooltip>

        <div className='d-flex flex-1 w-100 position-relative align-items-center'>
          <textarea
            rows={1}
            value={message}
            placeholder='Escreva uma mensagem'
            className='form-control form-control-lg form-control-solid border-transparent ms-5 me-5'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onEnterPress}
            style={{ minHeight: '50px' }}
            disabled={loadingSendMessage}
          />
          {loadingSendMessage && (
            <Spinner
              animation='border'
              className='spinner-border-custom position-absolute'
              style={{ right: 35 }}
              variant='primary'
            />
          )}
        </div>
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
    </div>
  )
}
