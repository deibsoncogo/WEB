import { useField } from '@unform/core'
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { onlyNums } from '../../formatters/currenceFormatter'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?: string
  classes?: string
}

export function InputNumber({ name, label, placeholderText, classes, ...rest }: IInputProps) {
  const { fieldName, registerField, defaultValue = 0, error, clearError } = useField(name)

  const [inputValue, setInputValue] = useState(defaultValue)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(onlyNums(e.target.value))

    if (error) {
      clearError()
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => Number(ref.current.value),
      setValue: (_, value) => {
        setInputValue(String(value))
      },
      clearValue: () => setInputValue(''),
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
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary input-number-no-arrow'
          name={name}
          value={inputValue}
          placeholder={placeholderText}
          ref={inputRef}
          onChange={handleChange}
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
