import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ICreateChatRoom } from '../../../../../domain/usecases/interfaces/chatRoom/createRoom'
import { IGetAllChatRooms } from '../../../../../domain/usecases/interfaces/chatRoom/getAllChatRooms'
import {
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
  KTSVG,
} from '../../../../../helpers'
import { Message } from './message'

let bufferMessages: Array<MessageModel>  =  [

]


type props = {
  getAllChatRooms: IGetAllChatRooms
  createChatRoom: ICreateChatRoom
}


export function ChatInner({getAllChatRooms, createChatRoom}: props) {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)

  const router = useRouter()
  const {idRoom} = router.query

  const handleSendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: 'in',
      text: message,
      time: '2m',
    }

    messages.push(newMessage)
    setMessages(bufferMessages)
    setMessage('')
   }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  useEffect(() => {
    

    //console.log(id)
    
 
  }, [])


  

  return (
    <>
      <div className='card-body position-relative overflow-auto mh-550px pb-100px'>
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </div>

      <div className='card-footer pt-4 border-top border-gray-600 d-flex align-items-center'>
        <button
          className='btn btn-sm btn-icon btn-active-light-primary'
          type='button'
          data-bs-toggle='tooltip'
          title='Coming soon'
        >
          <KTSVG path='/icons/com008.svg' className='svg-icon-3' />
        </button>

        <textarea
          rows={1}
          value={message}
          placeholder='Escreva uma mensagem'
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary ms-5 me-5'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        />

        <button type='button' title='Enviar' className='btn btn-primary' onClick={handleSendMessage}>
          <KTSVG path='/icons/gen016.svg' className='svg-icon-3' />
        </button>
      </div>
    </>
  )
}
