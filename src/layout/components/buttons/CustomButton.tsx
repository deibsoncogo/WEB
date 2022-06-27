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
    <button className={buttonClasses.join(' ')} disabled={loading} {...props}>
      {loading ? <Spinner animation='border' /> : title}
    </button>
  )
}

export { Button }
