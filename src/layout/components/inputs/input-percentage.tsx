import { useField } from '@unform/core'
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { maskedToPercentege } from '../../formatters/currenceFormatter'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?: string
  classes?: string
}

export function InputPercentage({ name, label, classes, ...rest }: IInputProps) {
  const { fieldName, registerField, defaultValue = '00%', error, clearError } = useField(name)

  const [inputValue, setInputValue] = useState(defaultValue)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(maskedToPercentege(e.target.value))
    if (error) {
      clearError()
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => Number(ref.current.value.replace('%', '')),
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

      <div className='form-control d-flex align-items-center form-control-lg p-0 m-0 border-0'>
        <input
          className='form-control form-control-lg form-control-solid border-transparent input-number-no-arrow'
          name={name}
          value={inputValue}
          placeholder='00%'
          ref={inputRef}
          onChange={handleChange}
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
