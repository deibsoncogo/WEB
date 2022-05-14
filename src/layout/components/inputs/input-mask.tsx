import { useEffect, useRef, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

import InputMask, { Props } from 'react-input-mask'

import styles from './styles.module.css'

type IInputProps = InputHTMLAttributes<HTMLInputElement> &
  Props & {
    name: string
    mask: (string | (string | RegExp)[]) & string
    label?: string
    onChange?: () => Promise<void>
  }

export function InputMasked({ name, label, mask, onChange, ...rest }: IInputProps) {
  const inputRef = useRef(null)

  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <div className='fv-row mb-7'>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <InputMask
        ref={inputRef}
        id={fieldName}
        mask={mask}
        className='form-control form-control-lg form-control-solid bg-secondary'
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
