import clsx from 'clsx'
import { UserInfoModel } from '../../../../../../helpers'

type props = {
  message: any 
}

export function Message({ message}: props) {

  const templateAttr = {}

  if (message.template) {
    Object.defineProperty(templateAttr, 'data-kt-element', {
      value: `template-${message.type}`,
    })
  }

  const contentClass = 'd-flex justify-content-start mb-10'
  return (
    <div
      className={clsx('d-flex', contentClass, 'mb-10', { 'd-none': message.template })}
      {...templateAttr}
    >
      <div className='d-flex align-items align-items-start'>
        <div className='d-flex align-items-center'>
          <div className='symbol align-items-start symbol-40px symbol-circle '>
            <img alt='Pic' src='/avatars/blank.png' />
          </div>
        </div>

        <div className='p-5 rounded bg-light-primary text-dark fw-bold w-75 text-start'>
          <div className='ms-3'>
            <span className='text-dark fs-7 mb-1 text-break'>{message.text}</span>
          </div>

          <div className='ms-3 text-end'>
            <span className='text-muted fs-7 mb-1'>{message.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
