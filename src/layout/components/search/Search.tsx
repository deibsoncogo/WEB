import { ChangeEvent, ChangeEventHandler, FormEvent, forwardRef } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { KTSVG } from '../../../helpers'

type SearchProps = {
  onChangeText: (text: string) => void
}

const Search = forwardRef<FormHandles, SearchProps>((props, ref) => {
  const { onChangeText } = props
  async function handleFormSubmit(data: any) {}

  const handleOnChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('HEllo aurora')
    onChangeText(event.target.value)
  }

  return (
    <Form
      data-kt-search-element='form'
      className='w-150 position-relative mb-3 bg-light rounded ps-3'
      autoComplete='off'
      ref={ref}
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
        onChangeCapture={handleOnChangeText}
      />
    </Form>
  )
})
Search.displayName = 'Search'

export { Search }
