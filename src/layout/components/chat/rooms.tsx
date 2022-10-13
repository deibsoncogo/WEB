import { useState } from 'react'
import {
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
  KTSVG,
} from '../../../helpers'
import { Message } from './message'

const bufferMessages = defaultMessages

export function ChatInner() {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)

  const sendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: 'out',
      text: message,
      time: 'Just now',
    }

    bufferMessages.push(newMessage)
    setMessages(bufferMessages)
    toggleChatUpdateFlat(!chatUpdateFlag)
    setMessage('')
    setTimeout(() => {
      bufferMessages.push(messageFromClient)
      setMessages(() => bufferMessages)
      toggleChatUpdateFlat((flag) => !flag)
    }, 1000)
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <div className='card-body position-relative overflow-auto mh-550px pb-100px'>
        {messages.map((message, index) => (
          <Message key={index} index={index} message={message} userInfos={userInfos} />
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
          className='form-control form-control-lg form-control-solid border-transparent secondary ms-5 me-5'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        />

        <button type='button' title='Enviar' className='btn btn-primary' onClick={sendMessage}>
          <KTSVG path='/icons/gen016.svg' className='svg-icon-3' />
        </button>
      </div>
    </>
  )
}
