import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { ChangeEvent, forwardRef, useState } from 'react'
import { IPlan, PlanType } from '../../../../domain/models/plan'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { onlyNums } from '../../../formatters/currenceFormatter'
import CustomButton from '../../buttons/CustomButton'
import { Input, Select, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { SelectMulti } from '../../inputs/input-multi-select'
import { InputNumber } from '../../inputs/input-number'
import { InputSingleImage } from '../../inputs/input-single-image'

type FormCreatePlansProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  loadCoursesOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadTrainingsOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadBooksOptions: (searchValue: string) => Promise<ISelectOption[]>
  loadRoomsOptions: (searchValue: string) => Promise<ISelectOption[]>
  hasAtLastOneProduct: boolean
  loadingFormSubmit: boolean
}

const planOptions: ISelectOption[] = [
  { label: 'Pagamento Único', value: PlanType.SINGLE_PAYMENT },
  { label: 'Pagamento Recorrente', value: PlanType.RECURRING_PAYMENT },
]

const FormCreatePlan = forwardRef<FormHandles, FormCreatePlansProps>((props, ref) => {
  const {
    onSubmit,
    onCancel,
    loadCoursesOptions,
    loadTrainingsOptions,
    loadBooksOptions,
    loadRoomsOptions,
    hasAtLastOneProduct,
    loadingFormSubmit,
  } = props

  const handleSubmit = (data: IPlan) => {
    onSubmit({
      ...data,
      price: onlyNums(data.price),
    })
  }

  const [planType, setPlanType] = useState<PlanType | ''>('')

  const handlePlanTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPlanType(e.target.value as PlanType)
  }

  return (
    <Form className='form' ref={ref} onSubmit={handleSubmit}>
      <h3 className='mb-5'>Informações do Plano</h3>

      <div className='container p-0 m-0'>
        <div className='row'>
          <div className='col'>
            <InputSingleImage name='image' />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <Input name='name' label='Nome' classes='h-75px' />
            <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
            <Select
              name='planType'
              label='Tipo de Plano'
              classes='h-75px'
              defaultValue=''
              onChange={handlePlanTypeChange}
            >
              <option disabled value=''>
                Selecione
              </option>
              {planOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </Select>

            {planType === PlanType.RECURRING_PAYMENT && (
              <InputNumber
                name='intervalPaymentMonths'
                label='Intervalo de Pagamento (messes)'
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
              label='Descrição'
              style={{ minHeight: '240px', margin: 0 }}
            />
            {planType === PlanType.SINGLE_PAYMENT && (
              <InputNumber
                name='intervalAccessMonths'
                label='Acesso ao Conteúdo (messes)'
                classes='h-75px'
              />
            )}
          </div>
        </div>

        <h3 className='mb-5 mt-5'>Itens Inclusos no Plano</h3>
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
          customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
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

FormCreatePlan.displayName = 'FormCreatePlan'

export { FormCreatePlan }
