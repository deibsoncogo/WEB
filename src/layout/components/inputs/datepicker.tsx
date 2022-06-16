import { useRef, useState, useEffect } from 'react'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import br from 'date-fns/locale/pt-BR'
import { useField } from '@unform/core'

import { rangeInt } from '../../../helpers'
import { months } from '../../../utils/months'

import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { InputMasked } from './input-mask'

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string
  label: string
  mask?: string
  classes?: string
}

registerLocale('br', br)
export function DatePicker({ name, label, mask, classes, ...rest }: Props) {
  const datepickerRef = useRef(null)
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)

  const [date, setDate] = useState(defaultValue || undefined)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef,
      getValue: (ref) => {
        return ref.current.props.selected
      },
      setValue: (ref: any, value: string) => {
        setDate(value)
        ref.current.value = value
      },
      clearValue: () => {
        setDate(undefined)
      },
    })
  }, [fieldName, registerField])

  const years = rangeInt(1900, new Date().getFullYear() + 1)

  return (
    <div className={`${classes} fv-row mb-7`}>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}

      <div>
        <ReactDatePicker
          ref={datepickerRef}
          className='form-control bg-secondar'
          selected={date}
          onChange={setDate}
          dateFormat='dd/MM/yyyy'
          name={name}
          locale='br'
          onFocus={clearError}
          {...rest}
          customInput = {<InputMasked name={name} mask={mask ? mask: ''}/>}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className='m-5 d-flex justify-content-center'>
              <button type='button' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <AiOutlineLeft />
              </button>

              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button type='button' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <AiOutlineRight />
              </button>
            </div>
          )}
          {...rest}
        />
      </div>
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}