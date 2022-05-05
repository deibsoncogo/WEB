import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'

import { checkIsActive } from '../../../helpers'

type Props = {
  children?: ReactNode
  to: string
  title?: string
  icon?: ReactElement
  hasBullet?: boolean
}

const AsideMenuItem: React.FC<Props> = ({ children, to, title, icon, hasBullet = false }) => {
  const { pathname } = useRouter()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className='menu-item'>
      <Link href={to}>
        <a className={clsx('menu-link without-sub', { active: isActive })}>
          {hasBullet && (
            <span className='menu-bullet'>
              <span className='bullet bullet-dot'></span>
            </span>
          )}

          <span className='menu-icon'>{icon}</span>
          <span className='menu-title'>{title}</span>
        </a>
      </Link>
      {children}
    </div>
  )
}

export { AsideMenuItem }
