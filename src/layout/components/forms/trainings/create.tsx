import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { forwardRef } from 'react'
import { IStreaming } from '../../../../domain/models/streaming'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { KTSVG } from '../../../../helpers'
import { Button } from '../../buttons/CustomButton'
import { DatePicker, Input, Select, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputNumber } from '../../inputs/input-number'
import { InputSingleImage } from '../../inputs/input-single-image'
import { SelectAsync } from '../../inputs/selectAsync'
import { StreamingTable } from '../../tables/streaming-list'

type FormCreateTrainingProps = {
  addStreamingDate: () => void
  onSubmit: (data: any) => void
  onCancel: () => void
  removeStreamItem: (index: number) => void
  searchTeachers: (teacherName: string) => Promise<ISelectOption[]>
  loadingSubmit: boolean
  streamList: IStreaming[]
  zoomUsersOptions: ISelectOption[]
  defaultTeacherOptions: ISelectOption[]
}

const FormCreateTraining = forwardRef<FormHandles, FormCreateTrainingProps>((props, ref) => {
  const {
    addStreamingDate,
    onSubmit,
    removeStreamItem,
    searchTeachers,
    onCancel,
    streamList,
    loadingSubmit,
    zoomUsersOptions,
    defaultTeacherOptions,
  } = props

  return (
    <Form className='form' ref={ref} onSubmit={onSubmit}>
      <h3 className='mb-5 text-muted'>Informações do Treinamento</h3>
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
              defaultOptions={defaultTeacherOptions}
            />

            <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
            <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
            <InputNumber name='installments' label='Quantidade de Parcelas' classes='h-75px' />
          </div>

          <div className='col d-flex flex-column'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '240px', margin: 0 }}
            />
            <Input name='level' label='Nível' />
          </div>
        </div>
      </div>

      <h3 className='mb-5 mt-5 text-muted'>Datas do Treinamento</h3>

      <div className='container p-0'>
        <div className='row'>
          <div className='col-3'>
            <DatePicker
              name='trainingEndDate'
              label='Data de Término'
              placeholderText='00/00/0000'
              autoComplete='off'
              minDate={new Date()}
              minYearAmount={0}
            />
          </div>

          <div className='col-3'>
            <DatePicker
              name='deactiveChatDate'
              label='Desativação do Chat'
              placeholderText='00/00/0000'
              autoComplete='off'
              minDate={new Date()}
              minYearAmount={0}
            />
          </div>
        </div>

        <div className='d-flex row'>
          <div className='col-3'>
            <Select name='zoomUserId' label='Usuário do Zoom' options={zoomUsersOptions} />
          </div>

          <div className='col-3'>
            <DatePicker
              name='streamingDate'
              label='Dia da Transmissão'
              placeholderText='00/00/0000'
              autoComplete='off'
              minDate={new Date()}
              minYearAmount={0}
            />
          </div>

          <div className='col-3'>
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

          <button
            type='button'
            onClick={addStreamingDate}
            className='btn btn-lg btn-primary h-45px text-nowrap col-3'
            style={{ marginTop: '22px' }}
          >
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Adicionar data
          </button>
        </div>
      </div>

      {streamList.length !== 0 && (
        <StreamingTable streamList={streamList} removeStreamItem={removeStreamItem} />
      )}

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
          disabled={loadingSubmit}
        />
      </div>
    </Form>
  )
})

FormCreateTraining.displayName = 'FormCreateTraining'

export { FormCreateTraining }
