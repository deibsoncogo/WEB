import { Form } from '@unform/web'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { KTSVG } from '../../../helpers'
import { Input } from '../inputs'

type Props = {
  visible: boolean
  close: () => void
  title: string
  children: React.ReactNode
}

const DrawerRight: React.FC<Props> = ({ visible, close, children, title }) => {
  return (
    <>
      {visible && <div className='draw-container-backdrop' onClick={close} />}
      <div className={visible ? 'draw-container draw-active' : 'draw-container'}>
        <div className='h-100 border d-flex flex-column'>
          <div className='border-bottom border-secondary border-3 py-6 pt-10 px-5 d-flex justify-content-between align-items-center'>
            <h4 className='fs-1 fw-light'>{title}</h4>
            <button
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              aria-label='Close'
              onClick={close}
            >
              <KTSVG path='/icons/arr061.svg' className='svg-icon svg-icon-2x' />
            </button>
          </div>

          <div className='px-5 h-100'>{children}</div>
        </div>
      </div>
    </>
  )
}

export { DrawerRight }
