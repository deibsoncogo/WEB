import { useRef, useState, useEffect } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useField } from '@unform/core'

import { formatDateToUTC, rangeInt } from '../../../helpers'
import { months } from '../../../utils/months'

import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string
  label: string
  classes?: string
}

export function DatePicker({ name, label, classes, ...rest }: Props) {
  const datepickerRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [date, setDate] = useState(defaultValue || null)

  useEffect(() => {
    registerField({
      ref: datepickerRef,
      name: fieldName,
      getValue: (ref) => {
        return ref.current?.props.selected
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue
        const newDate = formatDateToUTC(newValue)
        setDate(newDate)
      },
      clearValue: (ref) => {
        ref.current.value = ''
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
      <ReactDatePicker
        ref={datepickerRef}
        className='form-control bg-secondar'
        selected={date}
        onChange={setDate}
        dateFormat='dd/MM/yyyy'
        {...rest}
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
              onChange={({ target: { value } }) => changeYear(value)}
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
      {error && <span className='text-danger'>{error}</span>}
    </div>
  )
}
