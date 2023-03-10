import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { ChangeEvent, forwardRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { IPlan, PlanType } from '../../../../domain/models/plan'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { getAsyncCategoiesNoPaginationToSelectInput } from '../../../../utils/getAsyncCategoriesNoPaginationToSelectInput'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button as CustomButton } from '../../buttons/CustomButton'
import { Input, Select, SelectAsync, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { SelectMulti } from '../../inputs/input-multi-select'
import { InputNumber } from '../../inputs/input-number'
import { InputSingleImage } from '../../inputs/input-single-image'
import { planTypeOptions } from './planTypeOptions'

type FormCreatePlansProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  loadCoursesOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadTrainingsOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadBooksOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadRoomsOptions: (searchValue: string) => Promise<ISelectOption[]>
  getCategoriesNoPagination: IGetCategoriesNoPagination
  hasAtLastOneProduct: boolean
  loadingFormSubmit: boolean
}

const FormCreatePlan = forwardRef<FormHandles, FormCreatePlansProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    loadCoursesOptions,
    loadTrainingsOptions,
    loadBooksOptions,
    loadRoomsOptions,
    getCategoriesNoPagination,
    hasAtLastOneProduct,
    loadingFormSubmit,
  } = props

  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])

  const searchCategories = async (categoryName: string) => {
    return getAsyncCategoiesNoPaginationToSelectInput({
      categoryName,
      remoteGetCategoriesNoPagination: getCategoriesNoPagination,
    })
  }

  const handleSubmit = (data: IPlan) => {
    onSubmit({
      ...data,
      price: onlyNums(data.price),
    })
  }

  const [planType, setPlanType] = useState<PlanType | ''>('')

  const handlePlanTypeChange = (value: string) => {
    setPlanType(value as PlanType)
  }

  async function fetchData() {
    try {
      setDefaultCategoryOptions(await searchCategories(''))
    } catch (err) {
      toast.error('N??o foi poss??vel carregar os dados')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Form className='form' ref={ref} onSubmit={handleSubmit}>
      <h3 className='mb-5 text-muted'>Informa????es do Plano</h3>

      <div className='container p-0 m-0'>
        <div className='row'>
          <div className='col'>
            <InputSingleImage name='image' />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Input name='name' label='Nome' classes='h-75px' />
            <InputCurrence name='price' label='Pre??o' type='text' classes='h-75px' />
            <Select
              name='planType'
              label='Tipo de Plano'
              classes='h-75px'
              options={planTypeOptions}
              onChange={handlePlanTypeChange}
            />

            {planType === PlanType.RECURRING_PAYMENT && (
              <InputNumber
                name='intervalPaymentMonths'
                label='Intervalo de Pagamento (meses)'
                classes='h-75px'
              />
            )}

            {planType === PlanType.SINGLE_PAYMENT && (
              <InputNumber name='installments' label='Quantidade de parcelas' classes='h-75px' />
            )}
          </div>

          <div className='col'>
            <TextArea
              name='description'
              label='Descri????o'
              style={{ minHeight: '141px', margin: 0 }}
            />

            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
              defaultOptions={defaultCategoryOptions}
            />

            {planType === PlanType.SINGLE_PAYMENT && (
              <InputNumber
                name='intervalAccess'
                label='Acesso ao conte??do (meses)'
                classes='h-75px'
              />
            )}
          </div>
        </div>

        <h3 className='mb-5 mt-5 text-muted'>Itens Inclusos no Plano</h3>
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
          customClasses={['px-20', 'btn-primary']}
          loading={loadingFormSubmit}
        />
      </div>
    </Form>
  )
})

FormCreatePlan.displayName = 'FormCreatePlan'

export { FormCreatePlan }
