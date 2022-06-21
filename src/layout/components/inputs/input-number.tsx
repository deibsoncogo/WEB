import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?: string
  classes?: string
  onChange?: (value?: any) => void
}

export function InputNumber({
  name,
  label,
  placeholderText,
  classes,
  onChange,
  ...rest
}: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error, defaultValue = '', clearError } = useField(name)
  
  const [valueInput, setValueInput] = useState(defaultValue)
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reggex = new RegExp(/[^\d]/g)
    if (inputRef.current) {           
      if(!reggex.test(event.currentTarget.value)){
        inputRef.current.value = event.currentTarget.value 
        setValueInput(event.currentTarget.value ) 
      }
      else{
        inputRef.current.value = valueInput   
      }  
    }   
}

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return Number(ref.current.value)
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className={`${classes} fv-row mb-7`}>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <div className='form-control d-flex align-items-center form-control-lg bg-secondary p-0 m-0 border-0'>
        <input
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary no-spinner'
          name={name}
          placeholder={placeholderText}
          ref={inputRef}
          onChange={handleOnChange} 
          onChangeCapture={clearError}
          defaultValue={valueInput}
          type='text'
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
