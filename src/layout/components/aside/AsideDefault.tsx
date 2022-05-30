import clsx from 'clsx'
import Link from 'next/link'

import { useLayout } from '../../core'
import { AsideMenu } from './AsideMenu'
import { KTSVG } from '../../../helpers'

import { BiUserCircle } from 'react-icons/bi'

function AsideDefault() {
  const { classes, config } = useLayout()
  const { aside } = config

  const name = localStorage.getItem('name')    
  const email = localStorage.getItem('email')

  return (
    <div
      id='kt_aside'
      className={clsx('aside aside-dark', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        <Link href='/dashboard'>
          <img
            alt='At Palex'
            className='h-25px logo'
            src='/images/ativonew_logo.png'
            height={40}
            width={101}
            style={{
              objectFit: 'contain'
            }}
          />
        </Link>

        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG path={'/icons/arr080.svg'} className={'svg-icon-1 rotate-180'} />
          </div>
        )}
      </div>

      <div className='aside-footer flex-column-auto pt-5 px-5' id='kt_aside_footer'>
        <div
          className='btn btn-custom btn-primary w-100'
          data-bs-toggle='tooltip'
          data-bs-trigger='hover'
          data-bs-dismiss-='click'
        >
          <div className='btn-label'>
            <h3 className='text-white'>{name}</h3>
            <span className='text-gray-500'>{email}</span>
          </div>

          <span className='svg-icon btn-icon svg-icon-2'>
            <BiUserCircle />
          </span>
        </div>
      </div>

      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
    </div>
  )
}

export { AsideDefault }
