import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IPlan } from '../../../../domain/models/plan'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button as CustomButton } from '../../buttons/CustomButton'
import { Input, InputNumber, SelectAsync, TextArea } from '../../inputs'
import { SelectMulti } from '../../inputs/input-multi-select'
import { InputSingleImage } from '../../inputs/input-single-image'

type FormEditFreePlanProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  loadCoursesOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadTrainingsOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadBooksOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadRoomsOptions: (searchValue: string) => Promise<ISelectOption[]>
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
  hasAtLastOneProduct: boolean
  loadingFormSubmit: boolean
}

const FormEditFreePlan = forwardRef<FormHandles, FormEditFreePlanProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    loadCoursesOptions,
    loadTrainingsOptions,
    loadBooksOptions,
    loadRoomsOptions,
    searchCategories,
    hasAtLastOneProduct,
    loadingFormSubmit,
  } = props

  const handleSubmit = (data: IPlan) => {
    onSubmit(data)
  }

  return (
    <Form className='form' ref={ref} onSubmit={handleSubmit}>
      <h3 className='mb-5 text-muted'>Informações do Plano Gratuito</h3>

      <div className='container p-0 m-0'>
        <div className='row'>
          <div className='col'>
            <InputSingleImage name='image' />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Input name='name' label='Nome' classes='h-75px' />
            <InputNumber name='intervalAccess' label='Acesso ao Conteúdo (dias)' />
            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
            />
          </div>

          <div className='col'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '240px', margin: 0 }}
            />
          </div>
        </div>

        <h3 className='mb-5 mt-5 text-muted'>Itens Inclusos no Plano Gratuito</h3>
        {!hasAtLastOneProduct && (
          <div
            className='text-danger'
            style={{
              position: 'relative',
              top: '-15px',
            }}
          >
            Selecione pelo menos um produto
          </div>
        )}

        <div className='row'>
          <div className='col'>
            <SelectMulti loadOptions={loadCoursesOptions} name='courses' label='Cursos' />
          </div>
          <div className='col'>
            <SelectMulti loadOptions={loadTrainingsOptions} name='trainings' label='Treinamentos' />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <SelectMulti loadOptions={loadBooksOptions} name='books' label='Livros' />
          </div>
          <div className='col'>
            <SelectMulti loadOptions={loadRoomsOptions} name='rooms' label='Salas' />
          </div>
        </div>
      </div>

      <div className='d-flex mt-10'>
        <CustomButton
          title='Cancelar'
          type='button'
          customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
          onClick={onCancel}
        />

        <CustomButton
          type='submit'
          title='Salvar'
          customClasses={['w-180px', 'btn-primary']}
          loading={loadingFormSubmit}
        />
      </div>
    </Form>
  )
})

FormEditFreePlan.displayName = 'FormEditFreePlan'

export { FormEditFreePlan }
