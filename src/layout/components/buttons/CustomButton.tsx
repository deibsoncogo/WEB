import React from 'react'
import { Spinner } from 'react-bootstrap'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  loading?: boolean
  customClasses: string[]
}
function CustomButton({ title, loading = false, customClasses = [], ...props }: CustomButtonProps) {
  const buttonClasses = [
    'btn btn-lg',
    'mb-5',
    'align-items-center',
    'justify-content-center',
    'd-flex ',
  ]

  buttonClasses.push(...customClasses)

  return (
    <button
      className={buttonClasses.join(' ')}
      form='create-category-form'
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner animation='border' /> : title}
    </button>
  )
}

export default CustomButton
