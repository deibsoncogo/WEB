import clsx from 'clsx'
import Link from 'next/link'

import { useLayout } from '../../core'
import Image from 'next/image'

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout()
  const { aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
    >
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between'
        )}
      >
        {aside.display && (
          <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
            <div
              className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
              id='kt_aside_mobile_toggle'
            >
              <Image
                src='/images/logo_palex.png'
                alt='Alt'
                className='svg-icon-2x'
                height='50'
                width='50'
              />
            </div>
          </div>
        )}
        {!aside.display && (
          <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0'>
            <Link href='/dashboard' className='d-lg-none'>
              <a>
                <Image
                  alt='Logo'
                  src={'/images/logo_palex.png'}
                  className='h-30px'
                  height='50'
                  width='50'
                />
              </a>
            </Link>
          </div>
        )}

        <div className='d-flex align-items-center ms-5'>
          <h1 className='m-0'>Usuários</h1>
        </div>
      </div>
    </div>
  )
}
