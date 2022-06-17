import { useField } from '@unform/core'
import { InputHTMLAttributes, useEffect, useRef } from 'react'

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
  const { fieldName, registerField, defaultValue = 0, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return Number(ref.current.value)
      },
      setValue: (ref, value) => {
        ref.current.value = Number(value)
      },
      clearValue: (ref) => {
        ref.current.value = 0
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
          onChange={onChange}
          onChangeCapture={clearError}
          defaultValue={defaultValue}
          type='number'
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
