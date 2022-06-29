import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IBook } from '../../../../domain/models/book'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button } from '../../buttons/CustomButton'
import { Input, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputSingleImage } from '../../inputs/input-single-image'
import { SelectAsync } from '../../inputs/selectAsync'

type FormEditBookProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
  loadingSubmit: boolean
}

const FormEditBook = forwardRef<FormHandles, FormEditBookProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    searchCategories,
    loadingSubmit,
  } = props

  const handleSubmit = async (data: IBook) => {
    onSubmit({
      ...data,
      price: onlyNums(data.price),
      discount: onlyNums(data.discount)
    })
  }

  return (
     <Form className='form' ref={ref} onSubmit={handleSubmit}>
       <div className='d-flex flex-row gap-5 w-100'>
         <div className='w-100'>
           <h3 className='mb-5'>Dados do Livro</h3>
               <div className='d-flex justify-content-start flex-row '>
                 <div
                   className='d-flex justify-content-center flex-column w-100'
                   style={{
                     marginRight: '10%',
                   }}
                 >
                   <InputSingleImage name='image' />
                   <Input name='name' label='Título' type='text' />
                   <Input name='author' label='Autor' type='text' />
                   <Input name='stock' label='Estoque' type='number' />
                   <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
                   <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
                 </div>
                 <div className='d-flex justify-content-start flex-column w-100'>
                   <TextArea
                     name='description'
                     label='Descrição'
                     rows={10}
                   />

                    <SelectAsync
                      searchOptions={searchCategories}
                      name='categoryId'
                      label='Categoria'
                      classes='h-75px'
                      placeholder='Digite o nome da categoria'
                    />
                 </div>
               </div>
               <div className='mb-10 d-flex justify-content-end'>
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
