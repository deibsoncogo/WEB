import { useField } from '@unform/core'
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef } from 'react'
import { onlyNums } from '../../formatters/currenceFormatter'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?: string
  classes?: string
}

export function InputNumber({ name, label, placeholderText, classes, ...rest }: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue = 0, error, clearError } = useField(name)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = onlyNums(e.target.value)
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
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary'
          name={name}
          placeholder={placeholderText}
          ref={inputRef}
          onChange={handleInputChange}
          onChangeCapture={clearError}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
