import { useRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { KTSVG } from '../../../helpers'

function Search() {
  const formRef = useRef<FormHandles>(null)

  async function handleFormSubmit(data: any) {}

  return (
    <Form
      data-kt-search-element='form'
      className='w-150 position-relative mb-3 bg-light rounded ps-3'
      autoComplete='off'
      ref={formRef}
      onSubmit={handleFormSubmit}
    >
      <KTSVG
        path='/icons/gen021.svg'
        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0'
      />

      <input
        name='search'
        placeholder='Pesquisar...'
        type='text'
        className='form-control form-control-flush ps-10'
        data-kt-search-element='input'
      />
    </Form>
  )
}

export { Search }
