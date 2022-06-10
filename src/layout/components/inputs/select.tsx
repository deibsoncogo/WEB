import { useRef, useEffect, ReactNode, SelectHTMLAttributes } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

type SelectFace = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  children: ReactNode
  label?: string
  classes?: string
}

export function Select({ name, label, classes, children, ...rest }: SelectFace) {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: (ref) => {
        return ref.current?.value
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
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

      <select
        id={fieldName}
        ref={selectRef}
        className={`form-select form-select-solid ${error && 'option-invalid'}`}        
        defaultValue={defaultValue}
        onChange={() => clearError()}
        {...rest}
      >
        <option value='' hidden disabled selected>
          {error ? error : 'Selecione'}
        </option>
        {children}
      </select>
    </div>
  )
}
