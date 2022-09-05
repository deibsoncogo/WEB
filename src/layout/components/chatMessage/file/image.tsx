import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

type CustomImageProps = {
  onClick: () => void
  imageURL: string
}
export const CustomImage = ({ imageURL, onClick }: CustomImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingEnd = () => {
    setIsLoading(false)
  }
  return (
    <div
      style={{ width: 250, height: 250 }}
      className='d-flex align-items-center justify-content-center'
    >
      {isLoading && <Spinner animation='border' variant='primary' />}
      <img
        style={{ width: 250, height: 250, display: isLoading ? 'none' : 'initial' }}
        src={imageURL}
        alt='Chat message'
        className='rounded w-100 cursor-pointer'
        onClick={onClick}
        onLoad={handleLoadingEnd}
      />
    </div>
  )
}
