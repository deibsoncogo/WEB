import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  onChange?: () => Promise<void>
}

export function Input({ name, label, onChange, ...rest }: IInputProps) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)
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
    <div className='fv-row mb-7'>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className='form-control form-control-lg form-control-solid bg-secondary'
        name={name}
        ref={inputRef}
        type='text'
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
