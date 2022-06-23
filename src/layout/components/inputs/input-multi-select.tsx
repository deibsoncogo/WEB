import { useField } from '@unform/core'
import { useEffect, useRef } from 'react'
import AsyncSelect from 'react-select/async'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'

type SelectMultiProps = {
  name: string
  label: string
  classes?: string
  loadOptions: (searchValue: string) => Promise<ISelectOption[]>
}

const SelectMulti = ({ loadOptions, name, label, classes }: SelectMultiProps) => {
  const selectRef = useRef(null)

  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: (ref) => {
        return ref.current?.state?.selectValue.map((value: any) => value.value)
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
      <AsyncSelect
        ref={selectRef}
        isMulti
        name={name}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        className='basic-multi-select'
        classNamePrefix='select'
        placeholder='Selecione'
      />
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}

export { SelectMulti }
