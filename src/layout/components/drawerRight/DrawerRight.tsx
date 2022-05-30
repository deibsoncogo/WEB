import { Form } from '@unform/web'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
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
            <RiCloseLine size={32} className='cursor-pointer' onClick={close} />
          </div>

          <div className='px-5 h-100'>{children}</div>
        </div>
      </div>
    </>
  )
}

export { DrawerRight }
