import { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface IInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
}

export function TextArea({ name, label, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { fieldName, defaultValue = '', registerField, error, clearError } = useField(name)

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

      <div className='form-control d-flex align-items-center form-control-lg p-0'>
        <textarea
          className='form-control form-control-lg form-control-solid border-transparent'
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          onChangeCapture={clearError}
          {...rest}
        />
      </div>

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
