import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ISelectOption } from '../../../domain/shared/interface/SelectOption'
import { useField } from '@unform/core'

type SelectProps = {
  options?: ISelectOption[]
  name: string
  label?: string
  classes?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

type OptionsState = {
  isOpen: boolean
  selectedOption?: ISelectOption | null
}

export function Select({ name, options = [], label, onChange }: SelectProps) {
  const selectRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)

  const labelField = `${name}-label`
  const { fieldName, registerField, error, clearError } = useField(name)
  const { fieldName: labelName, registerField: registerLabel } = useField(labelField)

  const [optionsState, setOptionsState] = useState<OptionsState>({ isOpen: false })
  const { isOpen } = optionsState

  const handleOnChangeCapture = async () => {
    setOptionsState((oldState) => ({
      ...oldState,
      selectedOption: null,
    }))
    clearError()
  }

  const handleSelectOptions = (option: ISelectOption) => {
    if (textInputRef.current && selectRef.current) {
      textInputRef.current.value = option.label
      selectRef.current.value = option.value
    }
    setOptionsState({
      isOpen: false,
      selectedOption: option,
    })
    clearError()
  }

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

  return (
    <>
      {isOpen && <div onClick={closeOptions} className='custom-select-drop' />}
      <div className='h-75px fv-row mb-7 position-relative custom-select'>
        {label && (
          <label htmlFor={name} className='form-label fs-6 fw-bolder text-dark'>
            {label}
          </label>
        )}

        <input type='hidden' name={name} ref={selectRef} />

        <div className='form-control d-flex align-items-center form-control-lg p-0 border-0'>
          <input
            type='text'
            name={labelField}
            style={{ zIndex: 2 }}
            className='form-select form-select-lg form-select-solid'
            placeholder='Selecione'
            onChangeCapture={handleOnChangeCapture}
            ref={textInputRef}
            onClick={openOptions}
            onChange={onChange}
          />
        </div>

        {error && <span className='text-danger'>{error}</span>}

        {isOpen && (
          <div className='options'>
            {options.map((option) => {
              return (
                <div
                  key={option.value}
                  className='option'
                  onClick={() => handleSelectOptions(option)}
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
