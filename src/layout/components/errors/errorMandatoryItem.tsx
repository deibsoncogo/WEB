import { Dispatch, SetStateAction } from "react"

type ItemNotFoundProps =  {
    mainMessage: string
    secondaryMessage: string
    setHasError: Dispatch<SetStateAction<boolean>>
  }
  
  export const ErrorMandatoryItem = ({mainMessage, secondaryMessage, setHasError}: ItemNotFoundProps) => {
  
      return (
        <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
          <strong>{mainMessage}</strong>
          {secondaryMessage}
          <button
            type='button'
            onClick={() => setHasError(false)}
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
          ></button>
        </div>
        )
  
  }