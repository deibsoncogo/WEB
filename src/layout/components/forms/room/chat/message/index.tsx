import clsx from 'clsx'
import { IChatRoom } from '../../../../../../domain/models/createChatRoom'
import { MessageType } from '../../../../../../domain/models/messageType'
import { DateLocalFullInformationMask } from '../../../../../formatters/dateLocalFormatter'
import { File } from '../file'
import { Text } from '../text'

type props = {
  message: IChatRoom
  isPreviousDateDifferentFromCurrent: boolean
  isToShowAvatarImage: boolean
}

export function Message({
  message,
  isPreviousDateDifferentFromCurrent,
  isToShowAvatarImage,
}: props) {
  const IsMessageWriteToday = (date: string) => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    return day === date.split('-')[2]
  }

  let dateMessage = ''

  if (IsMessageWriteToday(message.date) && isPreviousDateDifferentFromCurrent) {
    dateMessage = 'Hoje'
  }

  if (isPreviousDateDifferentFromCurrent && !IsMessageWriteToday(message.date)) {
    dateMessage = (
      <span className='text-dark fs-7 mb-1 text-break'>
        {DateLocalFullInformationMask(message.date)}
      </span>
    ) as any
  }

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div
        className={clsx({
          'd-flex align-items-center justify-content-center': true,
          'mb-5 mt-5': isPreviousDateDifferentFromCurrent,
        })}
      >
        {dateMessage}
      </div>
      <div className='d-flex align-items align-items-end mb-5'>
        <div
          className='d-flex align-items-center'
          style={{ visibility: isToShowAvatarImage ? 'visible' : 'hidden' }}
        >
          <div className='symbol px-2 align-items-start symbol-40px symbol-circle'>
            <img alt='Pic' src='/avatars/blank.png' />
          </div>
        </div>

        {message.messageType === MessageType.Text ? (
          <Text hour={message.hour} text={message.text} />
        ) : (
          <File
            fileURL={message.fileURL}
            hour={message.hour}
            fileType={message.fileType}
            fileOriginalName={message.fileOriginalName}
          />
        )}
      </div>
    </div>
  )
}
