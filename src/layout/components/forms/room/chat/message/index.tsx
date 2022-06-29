import clsx from 'clsx'
import { IChatRoom } from '../../../../../../domain/models/createChatRoom'
import { DateLocalFullInformationMask } from '../../../../../formatters/dateLocalFormatter'
import { HourMask } from '../../../../../formatters/hourFormatter'

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
    var today = new Date()
    var day = String(today.getDate()).padStart(2, '0')

    return day === date.split('-')[2]
  }

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div
        className={clsx({
          'd-flex align-items-center justify-content-center': true,
          'mb-5 mt-5': isPreviousDateDifferentFromCurrent,
        })}
      >
        {!isPreviousDateDifferentFromCurrent ? (
          ''
        ) : IsMessageWriteToday(message.date) ? (
          'Hoje'
        ) : (
          <span className='text-dark fs-7 mb-1 text-break'>
            {DateLocalFullInformationMask(message.date)}
          </span>
        )}
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

        <div className='p-5 rounded bg-light-primary text-dark fw-bold w-75 text-start'>
          <div className='ms-3'>
            <span className='text-dark fs-7 mb-1 text-break'>{message.message}</span>
          </div>

          <div className='ms-3 text-end'>
            <span className='text-muted fs-7 mb-1'>{HourMask(message.hour)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
