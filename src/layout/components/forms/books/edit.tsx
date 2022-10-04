import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IBook } from '../../../../domain/models/book'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button } from '../../buttons/CustomButton'
import { Input, InputNumber, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputSingleImage } from '../../inputs/input-single-image'

type FormEditBookProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  loadingSubmit: boolean
}

const FormEditBook = forwardRef<FormHandles, FormEditBookProps>((props, ref) => {
  const { onSubmit, onCancel, loadingSubmit } = props

  const handleSubmit = async (data: IBook) => {
    onSubmit({
      ...data,
      price: onlyNums(data.price),
      discount: onlyNums(data.discount),
    })
  }

  return (
    <Form className='form' ref={ref} onSubmit={handleSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5 text-muted'>Informações do Livro</h3>
          <InputSingleImage name='image' />
          <div className='d-flex justify-content-start flex-row gap-5'>
            <div className='d-flex justify-content-center flex-column w-100'>
              <Input name='name' label='Título' type='text' />
              <Input name='author' label='Autor' type='text' />
              <InputNumber name='stock' label='Estoque' classes='h-75px' />
              <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
              <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
            </div>
            <div className='d-flex justify-content-start flex-column w-100'>
              <TextArea name='description' label='Descrição' style={{ minHeight: '240px', margin: 0 }} />
              <Input name='level' label='Nível' />
              <InputNumber name='installments' label='Quantidade de Parcelas' classes='h-75px' />
            </div>
          </div>
          <div className='d-flex mt-10'>
            <Button
              title='Cancelar'
              type='button'
              customClasses={['btn-secondary', 'ms-auto', 'me-10']}
              onClick={onCancel}
            />
            <Button
              type='submit'
              title='Salvar'
              customClasses={['btn-primary']}
              loading={loadingSubmit}
            />
          </div>
        </div>
      </div>
    </Form>
  )
})

FormEditBook.displayName = 'FormEditBook'

export { FormEditBook }
