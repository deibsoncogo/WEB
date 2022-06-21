import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { maskedToMoney } from '../../formatters/currenceFormatter'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  placeholderText?: string
  classes?: string
  onChange?: (value?: any) => void
}

export function InputCurrence({
  name,
  label,
  placeholderText,
  classes,
  onChange,
  ...rest
}: IInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error, clearError } = useField(name)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = maskedToMoney(event.target.value)
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
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
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
      <div className='form-control d-flex align-items-center form-control-lg p-0 m-0 border-0'>
        <input
          ref={inputRef}
          className='form-control form-control-lg form-control-solid border-transparent bg-secondary'
          type='text'
          name={name}
          placeholder={placeholderText}
          onChange={handleOnChange}
          onChangeCapture={clearError}
          defaultValue='R$ 0,00'
          {...rest}
        />
      </div>

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
