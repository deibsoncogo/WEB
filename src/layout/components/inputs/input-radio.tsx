import { Dispatch, InputHTMLAttributes, SetStateAction, useRef} from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  value: string
  label?: string
  classes?: string
  setContentType?: Dispatch<SetStateAction<string>>
}

export function InputRadio({ name, value, label, classes, setContentType, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  
  return (
    <div className='form-check form-check-inline'>
      <input
        className='form-check-input'
        value={value}
        name={name}
        ref={inputRef}
        onChange={(event) => setContentType? setContentType(event.currentTarget.value): ''}
        defaultChecked={false}        
        type='radio'     
        {...rest}
      />

      {label && (
        <label className='form-check-label text-dark  fs-6' htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  )
}
