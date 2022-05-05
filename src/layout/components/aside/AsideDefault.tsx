import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

import { useLayout } from '../../core'
import { AsideMenu } from './AsideMenu'

function AsideDefault() {
  const { classes } = useLayout()

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
          <Image
            alt='At Palex'
            className='h-25px logo'
            src='/images/ativonew logo.png'
            height={40}
            width={101}
            objectFit='contain'
          />
        </Link>
      </div>

      <div className='aside-footer flex-column-auto pt-5 px-5' id='kt_aside_footer'>
        <h3 className='text-white'>Usuário xxx</h3>
        <span className='text-gray-500'>usuário-xxx@email.com</span>
      </div>

      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
    </div>
  )
}

export { AsideDefault }
