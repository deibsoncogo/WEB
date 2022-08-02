import { forwardRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'


import {InputMasked, Select } from '../inputs'
import { salesTypeOptions } from '../tables/sales-list/salesTypeOptions'
import { SalesFilter } from '../../../domain/usecases/interfaces/sale/getAllSales'

type FilterFormProps = {
  handleForm: (data: SalesFilter) => void
}

const FilterForm = forwardRef<FormHandles, FilterFormProps>((props, ref) => {
  const { handleForm } = props

  return (
    <>
      <Form autoComplete='off' ref={ref} onSubmit={handleForm} id='filter-form'>
        <div className='d-flex flex-row gap-2'>
          <Select name='status' label='Status' classes='h-75px w-50' defaultValue=''>
            <option disabled value=''>
              Selecione
            </option>
            {salesTypeOptions.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>

          <InputMasked
            classes='h-75px w-25'
            name='initialDate'
            label='Data Inicial'
            placeholder='00/00/0000'
            mask='99/99/9999'
          />

          <InputMasked
            classes='h-75px w-25'
            name='finalDate'
            label='Data Final'
            placeholder='00/00/0000'
            mask='99/99/9999'
          />
        </div>
      </Form>
    </>
  )
})
FilterForm.displayName = 'FilterForm'

export { FilterForm }
