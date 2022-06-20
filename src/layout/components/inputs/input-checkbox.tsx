import { useField } from '@unform/core'
import { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  classes?: string
  setIsToShowStreaming?: Dispatch<SetStateAction<boolean>>
}

export function InputCheckbox({ name, label, classes, setIsToShowStreaming, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue = false, error, clearError } = useField(name)
  const [valueCheck, setValueCheck] = useState(defaultValue)

  const handleOnChange = () => {    
    setValueCheck(!valueCheck)

      if(setIsToShowStreaming){
        setIsToShowStreaming(!valueCheck)
      }  
   }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value === "true"? true: false
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
        name={name}
        ref={inputRef}
        value={valueCheck}
        defaultChecked={defaultValue}
        onChange={handleOnChange}
        onChangeCapture={clearError}
        type='checkbox'
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
