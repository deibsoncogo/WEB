import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { forwardRef } from 'react'
import { IStreaming } from '../../../../domain/models/streaming'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { KTSVG } from '../../../../helpers'
import CustomButton from '../../buttons/CustomButton'
import { DatePicker, Input, TextArea } from '../../inputs'
import { InputCurrence } from '../../inputs/input-currence'
import { InputImage } from '../../inputs/input-image'
import { SelectAsync } from '../../inputs/selectAsync'
import { StreamingTable } from '../../tables/streaming-list'

type FormEditTrainingProps = {
  addStreamingDate: () => void
  onSubmit: (data: any) => void
  streamList: IStreaming[]
  removeStreamItem: (index: number) => void
  searchTeachers: (teacherName: string) => Promise<ISelectOption[]>
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
  isStreamingListValid: boolean
  loadingSubmit: boolean
}

const FormEditTraining = forwardRef<FormHandles, FormEditTrainingProps>((props, ref) => {
  const {
    addStreamingDate,
    onSubmit,
    removeStreamItem,
    searchTeachers,
    streamList,
    searchCategories,
    isStreamingListValid,
    loadingSubmit,
  } = props

  return (
    <Form className='form' ref={ref} onSubmit={onSubmit}>
      <h3 className='mb-5'>Informações do Treinamento</h3>
      <InputImage name='photo' />

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
          </div>

          <div className='col d-flex flex-column align-items-stretch justify-content-between'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '246px', margin: 0 }}
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
            <DatePicker
              name='streamingDate'
              label='Dia da transmissão'
              placeholderText='00/00/000'
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
              dateFormat='hh:mm'
            />
          </div>

          <div className='col-3 pt-8'>
            <button
              type='button'
              onClick={addStreamingDate}
              className='btn btn-lg btn-primary h-45px mb-7 mt-auto'
              style={{ marginTop: '22px' }}
            >
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Adicionar Data
            </button>
          </div>

          {!isStreamingListValid && (
            <span className='text-danger' style={{ marginTop: '-14px' }}>
              Insira pelo menos uma transmissão
            </span>
          )}
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
