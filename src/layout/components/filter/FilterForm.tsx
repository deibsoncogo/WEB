import { ChangeEvent, forwardRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { KTSVG } from '../../../helpers'
import { DatePicker, InputMasked, Select } from '../inputs'
import { StatusSaleType } from '../../../domain/models/statusSale'
import { salesTypeOptions } from '../tables/sales-list/salesTypeOptions'

type FilterFormProps = {
  handleForm: (data: any) => void
}

const FilterForm = forwardRef<FormHandles, FilterFormProps>((props, ref) => {
  const { handleForm } = props

  return (
    <>
      <Form
        data-kt-search-element='form'     
        className='w-150 position-relative mb-3 bg-light rounded ps-3' 
        autoComplete='off'
        ref={ref}
        onSubmit={handleForm}
      >

      <Select
              name='notificationType'
              label='Status'
              classes='h-75px'
              defaultValue=''             
            >
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
              classes='h-75px'
              name='phoneNumber'
              label='Data Inicial'
              placeholder='00/00/0000'
              mask='99/99/9999'
          />   
          
           <InputMasked
              classes='h-75px'
              name='phoneNumber'
              label='Data Final'
              placeholder='00/00/0000'
              mask='99/99/9999'
          />  

            
      </Form>
     
    </>
  )
})
FilterForm.displayName = 'FilterForm'

export { FilterForm }
