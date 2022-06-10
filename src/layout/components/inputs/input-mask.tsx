import { useEffect, useRef, InputHTMLAttributes } from 'react'
import { useField } from '@unform/core'

import InputMask, { Props } from 'react-input-mask'

import styles from './styles.module.css'

type IInputProps = InputHTMLAttributes<HTMLInputElement> &
  Props & {
    name: string
    mask: (string | (string | RegExp)[]) & string
    label?: string
    classes?: string
    onChange?: () => Promise<void>
  }

export function InputMasked({ name, label, classes, mask, onChange, ...rest }: IInputProps) {
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
    <div className={`${classes} fv-row mb-7`}>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <InputMask
        ref={inputRef}
        id={fieldName}
        mask={mask}
        placeholder={error && error}
        className={`form-control form-control-lg form-control-solid border-transparent bg-secondary ${error && 'placeholder-red'}`}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
    </div>
  )
}
