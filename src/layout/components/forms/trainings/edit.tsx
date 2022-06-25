import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IStreaming } from '../../../../domain/models/streaming'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { KTSVG } from '../../../../helpers'
import CustomButton from '../../buttons/CustomButton'
import { DatePicker, Input, Select, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputNumber } from '../../inputs/input-number'
import { InputSingleImage } from '../../inputs/input-single-image'
import { SelectAsync } from '../../inputs/selectAsync'
import { StreamingTable } from '../../tables/streaming-list'

type FormEditTrainingProps = {
  addStreamingDate: () => void
  onSubmit: (data: any) => void
  onCancel: () => void
  removeStreamItem: (index: number) => void
  searchTeachers: (teacherName: string) => Promise<ISelectOption[]>
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
  loadingSubmit: boolean
  streamList: IStreaming[]
  zoomUsersOptions: ISelectOption[]
}

const FormEditTraining = forwardRef<FormHandles, FormEditTrainingProps>((props, ref) => {
  const {
    addStreamingDate,
    onSubmit,
    onCancel,
    removeStreamItem,
    searchTeachers,
    searchCategories,
    streamList,
    loadingSubmit,
    zoomUsersOptions,
  } = props

  return (
    <Form className='form' ref={ref} onSubmit={onSubmit}>
      <h3 className='mb-5'>Informações do Treinamento</h3>
      <InputSingleImage name='image' />

      <div className='container p-0'>
        <div className='row'>
          <div className='col d-flex justify-content-between flex-column'>
            <Input name='name' label='Nome' classes='h-75px' />
            <SelectAsync
              searchOptions={searchTeachers}
              name='teacherId'
              label='Professor'
              classes='h-75px'
              placeholder='Digite o nome do professor'
            />

            <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
            <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
            <InputNumber name='installments' label='Quantidade de Parcelas' classes='h-75px' />
          </div>

          <div className='col d-flex flex-column align-items-stretch justify-content-between'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '240px', margin: 0 }}
            />
            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
            />
          </div>

          <div className='row'></div>
        </div>
      </div>

      <h3 className='mb-5 mt-5'>Datas do Treinamento</h3>

      <div className='container p-0'>
        <div className='row'>
          <div className='col-3'>
            <DatePicker
              name='trainingEndDate'
              label='Data de Termino'
              placeholderText='00/00/000'
            />
          </div>
          <div className='col-3'>
            <DatePicker
              name='deactiveChatDate'
              label='Desativação do chat'
              placeholderText='00/00/000'
            />
          </div>
        </div>

        <div className='row d-flex'>
          <div className='col-3'>
            <Select name='zoomUserId' label='Usuário do Zoom' defaultValue=''>
              <option disabled value=''>
                Selecione
              </option>
              {zoomUsersOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className='col-9'>
            <div className='row'>
              <div className='col-4'>
                <DatePicker
                  name='streamingDate'
                  label='Dia da transmissão'
                  placeholderText='00/00/000'
                  autoComplete='off'
                />
              </div>
              <div className='col-4'>
                <DatePicker
                  name='streamingHour'
                  label='Horário'
                  placeholderText='00:00'
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption='Horas'
                  dateFormat='HH:mm'
                  autoComplete='off'
                />
              </div>

              <div className='col-4'>
                <button
                  type='button'
                  onClick={addStreamingDate}
                  className='btn btn-lg btn-primary h-45px mb-7 text-nowrap'
                  style={{ marginTop: '22px' }}
                >
                  <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                  Adicionar Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {streamList.length !== 0 && (
        <StreamingTable streamList={streamList} removeStreamItem={removeStreamItem} />
      )}

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
          loading={loadingSubmit}
        />
      </div>
    </Form>
  )
})

FormEditTraining.displayName = 'FormEditTraining'

export { FormEditTraining }