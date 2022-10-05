import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Socket } from 'socket.io-client'
import { useRequest } from '../../../../../application/hooks/useRequest'
import { IChatTraining } from '../../../../../domain/models/createChatTraining'
import { SocketTrainingEvents } from '../../../../../domain/models/socketTrainingEvents'
import { IGetAllChatTraining } from '../../../../../domain/usecases/interfaces/chatTraining/getAllChatTraining'
import { IJoinTrainingChatRoom } from '../../../../../domain/usecases/interfaces/chatTraining/joinTrainingChatRoom'
import { IUploadFileChatTraining } from '../../../../../domain/usecases/interfaces/chatTraining/uploadFileChatTraining'
import { KTSVG } from '../../../../../helpers'
import { getSocketConnection } from '../../../../../utils/getSocketConnection'
import { ChatMessage } from '../../../chatMessage'
import { FullLoading } from '../../../FullLoading/FullLoading'
import ConfirmationModal from '../../../modal/ConfirmationModal'
import { handleUploadFile } from './utils/handleUploadFile'
import { isPreviousDateDifferentFromCurrent } from './utils/isPreviousDateDifferentFromCurrent'
import { isToShowAvatarImage } from './utils/isToShowAvatarImage'
import { sendMessage } from './utils/sendMessage'

let socket: Socket | null

type props = {
  getAllChatTraining: IGetAllChatTraining
  remoteJoinChat: IJoinTrainingChatRoom
  remoteUploadFile: IUploadFileChatTraining
}

export function ChatInner({ getAllChatTraining, remoteJoinChat, remoteUploadFile }: props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IChatTraining[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessageToDelete, setSelectedMessageToDelete] = useState<string | null>(null)
  const [loadingDeletion, setLoadingDeletion] = useState(false)
  const [loadingSendMessage, setLoadingSendMessage] = useState(false)
  const [isToEmitViewAllMessages, setIsToEmitViewAllMessages] = useState(false)

  const inputFileRef = useRef<HTMLInputElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { id } = router.query

  const { makeRequest: joinChatRoom, data: accessTokenChat } = useRequest<IJoinTrainingChatRoom>(
    remoteJoinChat.join
  )

  const {
    makeRequest: uploadFile,
    data: fileUploadSuccess,
    cleanUp: cleanUpFileUpload,
    error: fileUploadError,
  } = useRequest<IChatTraining, FormData>(remoteUploadFile.upload)

  const handleSendMessage = () => {
    sendMessage({ message, setLoadingSendMessage, setMessage, socket, trainingId: String(id) })
  }

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    setLoadingSendMessage(true)
    handleUploadFile({ event, trainingId: String(id), uploadFile })
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleDeleteMessage = () => {
    if (selectedMessageToDelete) {
      setLoadingDeletion(true)
      socket?.emit(SocketTrainingEvents.DeleteMessage, { id: selectedMessageToDelete }, () => {
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

  const socketInitializer = (token: string) => {
    socket = getSocketConnection(SocketTrainingEvents.Training, token)
    socket.connect()

    socket.on(SocketTrainingEvents.ReceiveMessage, (message) => {
      setMessages((oldState) => [...oldState, message])
      socket?.emit(SocketTrainingEvents.ViewMessage, { messageId: message.id })
    })

    socket.on(SocketTrainingEvents.DeletedMessage, (deletedMessage) => {
      setMessages((oldState) => oldState.filter((message) => message.id !== deletedMessage.id))
    })

    socket.on(SocketTrainingEvents.UpdateMessagesViews, (updatedMessages) => {
      setMessages(() => updatedMessages)
    })

    socket.on(SocketTrainingEvents.ConnectError, () => {
      toast.error('Falha ao se conectar com o servidor')
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id == 'string') {
        const response = await getAllChatTraining.getAll({ trainingId: id })
        setMessages(response.data)

        if (response.existsNewViewedMessages) {
          setIsToEmitViewAllMessages(true)
        }
      }
    }
    fetchData()
      .catch(() => toast.error('Não foi possível carregar as mensagens'))
      .finally(() => {
        setLoading(false)
      })

    joinChatRoom({ trainingId: id })
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
    if (isToEmitViewAllMessages && socket) {
      socket.emit(SocketTrainingEvents.ViewAllMessages)
    }
  }, [isToEmitViewAllMessages, socket])

  useEffect(() => {
    if (fileUploadSuccess) {
      setLoadingSendMessage(false)
      cleanUpFileUpload()

      socket?.emit(SocketTrainingEvents.ReceivedFileUploaded, {
        trainingChatId: fileUploadSuccess.id,
      })
    }
  }, [fileUploadSuccess])

  useEffect(() => {
    if (fileUploadError) {
      toast.error(fileUploadError)
    }
  }, [fileUploadError])

  useEffect(() => {
    if (!socket && accessTokenChat) {
      socketInitializer(String(accessTokenChat))
    }
    return () => {
      if (socket) {
        socket.removeAllListeners(SocketTrainingEvents.ReceiveMessage)
        socket.removeAllListeners(SocketTrainingEvents.DeletedMessage)
        socket.removeAllListeners(SocketTrainingEvents.UpdateMessagesViews)
        socket.removeAllListeners(SocketTrainingEvents.ConnectError)
        socket.disconnect()
        socket = null
      }
    }
  }, [accessTokenChat])

  return (
    <>
      <ConfirmationModal
        isOpen={!!selectedMessageToDelete}
        loading={loadingDeletion}
        onRequestClose={handleCloseDeleteConfirmationModal}
        onConfimation={handleDeleteMessage}
        content='Você tem certeza que deseja excluir esta mensagem?'
        title='Deletar'
      />
      {loading && <FullLoading />}
      <div className='card-body position-relative overflow-auto mh-550px pb-100px'>
        {messages.map((instantMessage, index) => (
          <ChatMessage
            key={instantMessage.id}
            message={instantMessage}
            isPreviousDateDifferentFromCurrent={isPreviousDateDifferentFromCurrent(index, messages)}
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
            className='form-control form-control-lg form-control-solid border-transparent bg-secondary ms-5 me-5'
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
          <Link href='/trainings'>
            <button className='btn btn-sm btn-icon btn-active-light-primary' type='button'>
              <KTSVG path='/icons/reply.svg' className='svg-icon svg-icon-2 svg-icon-primary ' />
            </button>
          </Link>
        </Tooltip>
      </div>
    </>
  )
}
