import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IChatTraining } from '../../../../../domain/models/createChatTraining'
import { ICreateChatTraining } from '../../../../../domain/usecases/interfaces/chatTraining/createTraining'
import { IGetAllChatTraining } from '../../../../../domain/usecases/interfaces/chatTraining/getAllChatRooms'
import { KTSVG, formatTime, formatDate } from '../../../../../helpers'
import { FullLoading } from '../../../FullLoading/FullLoading'
import { Message } from './message'

type props = {
  getAllChatTraining: IGetAllChatTraining
  createChatTraining: ICreateChatTraining
}

export function ChatInner({ getAllChatTraining, createChatTraining }: props) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IChatTraining[]>([])
  const [loading, setLoading] = useState(true)

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

      if (typeof id == 'string') {
        const chatTraining = {
          trainingId: id,
          message,
          date: formatDate(currentDateMessage, 'YYYY-MM-DD'),
          hour: formatTime(currentDateMessage, 'HH:mm:ss'),
        }
        await createChatTraining.create(chatTraining)
        messages.push(chatTraining)
        setMessages(messages)
        setMessage('')
      }
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

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id == 'string') {
        setMessages(await getAllChatTraining.getAll({ trainingId: id }))
      }
    }
    fetchData()
      .catch(() => toast.error('Não foi possível carregar as mensagens'))
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
          <button className='btn btn-sm btn-icon btn-active-light-primary' type='button'>
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
