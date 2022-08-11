import { useField } from '@unform/core'
import { useEffect, useRef, useState } from 'react'
import { MultiValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'

type SelectMultiProps = {
  name: string
  label: string
  classes?: string
  numberOfItems?: number
  loadOptions: (searchValue: string) => Promise<ISelectOption[]>
  defaultValues?: ISelectOption[]
}

const SelectMulti = ({
  loadOptions,
  name,
  label,
  classes,
  defaultValues = [],
  numberOfItems,
}: SelectMultiProps) => {
  const selectRef = useRef(null)
  const [inputValues, setInputValues] = useState<ISelectOption[]>([])

  const { fieldName, registerField, error, clearError } = useField(name)

  const handleInputChange = (e: MultiValue<ISelectOption>) => {
    if (numberOfItems && inputValues.length > 0) {
      setInputValues(e.slice(0 + numberOfItems))
      return
    }
    setInputValues(e as ISelectOption[])
  }

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: (ref) => {
        if (numberOfItems === 1) {
          return ref.current?.state?.selectValue[0]?.value
        }
        return ref.current?.state?.selectValue.map((value: any) => value.value)
      },
      setValue: (_, newValue) => {
        setInputValues(newValue)
      },
      clearValue: (ref: any) => {
        ref.current?.setValue([])
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
        defaultValue={defaultValues}
        loadOptions={loadOptions}
        className='basic-multi-select'
        classNamePrefix='select'
        placeholder='Selecione'
        onFocus={clearError}
        onChange={handleInputChange}
        value={inputValues}
      />
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}

export { SelectMulti }
