import { useField } from '@unform/core'
import { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  value: string
  label?: string
  classes?: string
  setContentType?: Dispatch<SetStateAction<string>>
}

export function InputRadio({ name, value, label, classes, setContentType, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, clearError } = useField(name)
  
 

   const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    if (inputRef.current) {      
        inputRef.current.checked = event.currentTarget.checked             
        if(setContentType)
           setContentType(inputRef.current.value)    
    }   
}

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {        
        ref.current.value =  value
      },
      clearValue: (ref) => {
        ref.current.value = false
      },
    })
  }, [fieldName, registerField])

  return (
    <div className='form-check form-check-inline'>
      <input
        className='form-check-input'
        value={value}
        name={name}
        ref={inputRef}
        onChange={handleOnChange}
        onChangeCapture={clearError}
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
