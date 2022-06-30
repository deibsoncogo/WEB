import React from 'react'
import { Spinner } from 'react-bootstrap'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  size?: 'sm' | 'lg' | 'icon'
  loading?: boolean
  customClasses: string[]
}

function Button({
  title,
  size = 'lg',
  loading = false,
  customClasses = [],
  ...props
}: CustomButtonProps) {
  const buttonClasses = [
    'btn',
    `btn-${size === 'icon' ? 'icon' : 'lg'}`,
    `button-size-${size}`,
    'd-flex',
    'align-items-center',
    'justify-content-center',
  ]

  buttonClasses.push(...customClasses)

  return (
    <div className='d-flex'>
      <button className={buttonClasses.join(' ')} disabled={loading} {...props}>
        {loading ? (
          // span element prevent button bootstrap classes afect sppiner classes
          <span>
            <Spinner animation='border' />
          </span>
        ) : (
          title
        )}
      </button>
    </div>
  )
}

export { Button }
