import { useRef, useEffect, ReactNode, SelectHTMLAttributes } from 'react'

import { useField } from '@unform/core'
import { Form } from '@unform/web'

type SelectFace = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string
  children: ReactNode
  label?: string
}

export function Select({ name, label, children, ...rest }: SelectFace) {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

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
    <div className='fv-row mb-7'>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <select
        id={fieldName}
        ref={selectRef}
        className='form-select form-select-solid'
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </select>

      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
