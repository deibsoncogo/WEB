import { useField } from '@unform/core'
import br from 'date-fns/locale/pt-BR'
import { FocusEvent, useEffect, useRef, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { rangeInt } from '../../../helpers'
import { months } from '../../../utils/months'
import 'react-datepicker/dist/react-datepicker.css'

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string
  label: string
  classes?: string
  mask?: (string | (string | RegExp)[]) & string
  minYearAmount?: number
  maxYearAmount?: number
}

registerLocale('br', br)
export function DatePicker({
  name,
  label,
  classes,
  mask,
  minYearAmount = 100,
  maxYearAmount = 11,
  ...rest
}: Props) {
  const datePickerRef = useRef(null)
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
  const [enteredDate, setEnteredDate] = useState(defaultValue || undefined)

  const handleDateRawChange = (e: FocusEvent<HTMLInputElement, Element>) => {
    const regex = new RegExp(/[^\d|^\/]/g)

    if (regex.test(e.target.value)) {
      // with only one call to target value the clear input dont work
      e.target.value = ''
      e.target.value = ''
      clearError()
    }
  }

  useEffect(() => {
    registerField({
      ref: datePickerRef,
      name: fieldName,
      getValue: (ref) => {
        return ref?.current.props.selected
      },
      setValue: (ref: any, value: string) => {
        setEnteredDate(value)
        ref.current.value = value
      },
      clearValue: () => {
        setEnteredDate(undefined)
      },
    })
  }, [fieldName, registerField])

  const yearBase = new Date().getFullYear()
  const years = rangeInt(yearBase - minYearAmount, yearBase + maxYearAmount)

  return (
    <div className={`${classes} fv-row mb-7`}>
      {label && (
        <label className='form-label fs-6 fw-bolder text-dark' htmlFor={name}>
          {label}
        </label>
      )}
      <div>
        <ReactDatePicker
          ref={datePickerRef}
          className='form-control form-control-solid bg-secondar'
          selected={enteredDate}
          onChange={setEnteredDate}
          dateFormat='dd/MM/yyyy'
          name={name}
          locale='br'
          onChangeRaw={handleDateRawChange}
          onFocus={clearError}
          autoComplete='off'
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
                {months.map((option, index) => (
                  <option key={index} value={option}>
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
