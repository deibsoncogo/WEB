type ItemNotFoundProps = {
  message: string
}

export const ItemNotFound = ({ message }: ItemNotFoundProps) => {
  return (
    <div className='py-14 border mx-4 my-8 d-flex'>
      <p className='text-center w-100 m-0 font-weight-bold'>
        <span className='text-danger'>Ops! 😅 </span>
        {message}
      </p>
    </div>
  )
}
