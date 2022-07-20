import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  options: { id: string; value: string; label: string }[]
}

export function Radio({ name, label, options, ...rest }: IRadioProps) {
  const inputRefs = useRef([])
  const { fieldName, registerField, defaultValue = '', error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs) => {
        return refs.current.find((input: any) => input?.checked)?.value
      },
      setValue: (refs, id) => {
        const inputRef = refs.current.find((ref: any) => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find((ref: any) => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <div className='mb-5'>
      {label && <p className='form-label fs-6 fw-bolder text-dark'>{label}</p>}

      {options.map((option, index) => (
        <span key={option.id} className='me-4'>
          <input
            type='radio'
            ref={(ref) => {
              inputRefs.current[index] = ref as never
            }}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            className='form-check-input me-2 cursor-pointer'
            {...rest}
          />

          <label
            htmlFor={option.id}
            key={option.id}
            className='form-check-label text-dark fs-6 cursor-pointer'
          >
            {option.label}
          </label>
        </span>
      ))}

      {error && <span className='d-flex text-danger mt-2'>{error}</span>}
    </div>
  )
}
