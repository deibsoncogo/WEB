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
}

type OptionsState = {
  isOpen: boolean
  selectedOption?: ISelectOption | null
  inputValue: string
}

const SelectAsync = ({ searchOptions, label, name, placeholder }: SelectAsyncProps) => {
  const [options, setOptions] = useState<ISelectOption[]>([])
  const [loading, setLoading] = useState(false)

  const [optionsState, setOptionsState] = useState<OptionsState>({ inputValue: '', isOpen: false })
  const { inputValue, isOpen, selectedOption } = optionsState

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionsState((oldState) => ({
      ...oldState,
      inputValue: event.target.value,
      selectedOption: null,
    }))
  }

  const handleSelecOptions = (option: ISelectOption) => {
    setOptionsState({
      isOpen: false,
      inputValue: option.label,
      selectedOption: option,
    })
  }

  const getOptions = debounce(async () => {
    setLoading(true)
    const optionsArr = await searchOptions(inputValue)

    setOptions(optionsArr)
    setOptionsState((oldState) => ({ ...oldState, isOpen: true }))

    setLoading(false)
  })

  const closeOptions = () => {
    setOptionsState((oldState) => ({ ...oldState, isOpen: false }))
  }

  useEffect(() => {
    if (inputValue && inputValue !== selectedOption?.label) {
      getOptions()
    }
  }, [inputValue])

  const { fieldName, defaultValue, registerField, error } = useField(name)

  //   useEffect(() => {
  //     registerField({
  //       ref: selectRef,
  //       name: fieldName,
  //       getValue: (ref) => {
  //         return ref.current?.value
  //       },
  //       setValue: (ref, newValue) => {
  //         ref.current.value = newValue
  //       },
  //       clearValue: (ref) => {
  //         ref.current.value = ''
  //       },
  //     })
  //   }, [fieldName, registerField])

  return (
    <>
      {isOpen && <div className='custom-select-async-drop' onClick={closeOptions} />}
      <div className='h-75px fv-row mb-7 position-relative custom-select-async'>
        {label && (
          <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
            {label}
          </label>
        )}

        <div
          className='form-control bg-secondary d-flex align-items-center form-control-lg p-0 border-0'
          style={{ backgroundColor: 'red' }}
        >
          <input
            name={name}
            type='text'
            style={{ zIndex: 2 }}
            className='form-select form-select-lg form-select-solid'
            placeholder={placeholder}
            onChange={handleOnChange}
            value={optionsState.inputValue}
            onFocus={getOptions}
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

        {isOpen && optionsState.inputValue.length > 0 && (
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
