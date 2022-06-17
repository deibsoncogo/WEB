import React, { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { debounce } from '../../../helpers/debounce'
import { Loading } from '../loading/loading'
import { Select } from './select'
import { useField } from '@unform/core'

type SelectAsyncProps = {
  searchOptions: (inputVlaue: string) => Promise<any[]>
  name: string
  label?: string
  classes?: string
  placeholder: string
  defaultOptions?: ISelectOption[]
}

type OptionsState = {
  isOpen: boolean
  selectedOption?: ISelectOption | null
}

const SelectAsync = ({
  searchOptions,
  label,
  name,
  placeholder,
  defaultOptions = [],
}: SelectAsyncProps) => {
  const selectRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const [options, setOptions] = useState<ISelectOption[]>(defaultOptions)
  const [loading, setLoading] = useState(false)

  const labelField = `${name}-label`
  const { fieldName, registerField, error, clearError } = useField(name)
  const { fieldName: labelName, registerField: registerLabel } = useField(labelField)

  const [optionsState, setOptionsState] = useState<OptionsState>({ isOpen: false })
  const { isOpen } = optionsState

  const handleOnChange = async () => {
    setOptionsState((oldState) => ({
      ...oldState,
      selectedOption: null,
    }))

    getOptions()
  }

  const handleSelecOptions = (option: ISelectOption) => {
    if (textInputRef.current && selectRef.current) {
      textInputRef.current.value = option.label
      selectRef.current.value = option.value
    }
    setOptionsState({
      isOpen: false,
      selectedOption: option,
    })
  }

  const getOptions = debounce(async () => {
    if (textInputRef.current) {
      setLoading(true)
      const optionsArr = await searchOptions(textInputRef?.current.value || '')

      setOptions(optionsArr)
      setOptionsState((oldState) => ({ ...oldState, isOpen: true }))

      setLoading(false)
    }
  })

  const closeOptions = () => {
    setOptionsState((oldState) => ({ ...oldState, isOpen: false }))
  }

  const openOptions = () => {
    setOptionsState((oldState) => ({ ...oldState, isOpen: true }))
  }

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

  useEffect(() => {
    registerLabel({
      ref: textInputRef,
      name: labelName,
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
  }, [labelName, registerLabel])

  useEffect(() => {
    if (defaultOptions.length > 0) {
      setOptions(defaultOptions)
    }
  }, [defaultOptions])

  return (
    <>
      {isOpen && <div className='custom-select-async-drop' onClick={closeOptions} />}
      <div className='h-75px fv-row mb-7 position-relative custom-select-async'>
        {label && (
          <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
            {label}
          </label>
        )}

        <input type='hidden' name={name} ref={selectRef} />

        <div className='form-control bg-secondary d-flex align-items-center form-control-lg p-0 border-0'>
          <input
            type='text'
            name={labelField}
            style={{ zIndex: 2 }}
            className='form-select form-select-lg form-select-solid'
            placeholder={placeholder}
            onChange={handleOnChange}
            onFocus={getOptions}
            onChangeCapture={clearError}
            ref={textInputRef}
            autoComplete='off'
            onClick={openOptions}
          />

          {loading && (
            <div
              className='spinner-border spinner-border-sm position-absolute text-primary'
              role='status'
              style={{ height: '20px', width: '20px', right: '40px' }}
            />
          )}
        </div>

        {error && <span className='text-danger'>{error}</span>}

        {isOpen && (
          <div className='options'>
            {options.map((option) => {
              return (
                <div
                  key={option.value}
                  className='option'
                  onClick={() => handleSelecOptions(option)}
                  onBlurCapture={closeOptions}
                >
                  {option.label}
                </div>
              )
            })}

            {options.length === 0 && <p className='text-center mb-0'>Nenhum item encontrado</p>}
          </div>
        )}
      </div>
    </>
  )
}

export { SelectAsync }