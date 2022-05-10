import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

export function Input({ name, label, ...rest }: IInputProps) {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)
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

  return (
    <div className='fv-row mb-10'>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className='form-control form-control-lg form-control-solid'
        name={name}
        ref={inputRef}
        type='text'
        {...rest}
      />

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
