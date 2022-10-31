import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { SalesFilter } from '../../../domain/usecases/interfaces/sale/getAllSales'
import { InputMasked, SelectMulti } from '../inputs'
import { salesTypeOptions } from '../tables/sales-list/salesTypeOptions'

type FilterFormProps = {
  handleForm: (data: SalesFilter) => void
}

export const FilterForm = forwardRef<FormHandles, FilterFormProps>((props, ref) => {
  const { handleForm } = props

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: 45,
      minWidth: 300,
    }),
  }

  return (
    <>
      <Form autoComplete='off' ref={ref} onSubmit={handleForm} id='filter-form' className='card m-0 p-0'>
        <div className='card-header border-0 gap-5 m-0 p-0'>
          <SelectMulti
            defaultOptions={salesTypeOptions}
            name='status'
            label='Status'
            customStyles={customStyles}
          />

          <span className='d-flex flex-row gap-5 card-title m-0 p-0'>
            <InputMasked
              style={{ width: '150px' }}
              name='initialDate'
              label='Data Inicial'
              placeholder='00/00/0000'
              mask='99/99/9999'
            />

            <InputMasked
              style={{ width: '150px' }}
              name='finalDate'
              label='Data Final'
              placeholder='00/00/0000'
              mask='99/99/9999'
            />
          </span>
        </div>
      </Form>
    </>
  )
})

FilterForm.displayName = 'FilterForm'
