import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?:string
  onChange?: (value?:any) => void
}

export function Input({ name, label, placeholderText, onChange, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)
  const [isEyeVisible, setIsEyeVisible] = useState(true)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  function switchType() {
    if (!inputRef) return

    if (inputRef?.current?.type === 'text') {
      inputRef.current.type = 'password'
      setIsEyeVisible(true)
    } else if (inputRef?.current?.type === 'password') {
      inputRef.current.type = 'text'
      setIsEyeVisible(false)
    }
  }

  return (
    <div className='fv-row mb-7'>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      {name != 'content' ? (
        <p className='form-control bg-secondary d-flex align-items-center form-control-lg p-0'>
          <input
            className='form-control form-control-lg form-control-solid border-transparent bg-secondary'
            type='text'
            name={name}
            placeholder={placeholderText}
            ref={inputRef}
            defaultValue={defaultValue}
            onChange={onChange}
            {...rest}
          />

          {rest.type === 'password' && isEyeVisible && (
            <AiFillEye size={24} className='me-2' onClick={switchType} />
          )}
          {rest.type === 'password' && !isEyeVisible && (
            <AiFillEyeInvisible size={24} className='me-2' onClick={switchType} />
          )}
        </p>
      ) : (
        <input
          type='text'
          hidden={true}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
