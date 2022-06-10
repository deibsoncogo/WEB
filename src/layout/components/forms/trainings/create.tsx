import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import * as Yup from 'yup'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { KTSVG } from '../../../../helpers'
import { levelOptions } from '../../../../utils/selectOptions'
import { DatePicker, Input, Select, TextArea } from '../../inputs'
import { InputImage } from '../../inputs/input-image'
import { SelectAsync } from '../../inputs/selectAsync'
import { LivesTable } from '../../tables/lives-list'

interface IStreamList {
  liveDate: string
  time: string
  start: boolean
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é Nescessário'),
  teacherId: Yup.string().required('Professor é nescessário'),
  price: Yup.number().required('Preço é nescessário'),
  description: Yup.string().required('Descriçao é nescessário'),
  categories: Yup.string().required('Selecione uma categoria'),
  finishDate: Yup.date().nullable().required('Data é nescessária'),
  liveDate: Yup.date().nullable().required('Data é nescessária'),
  chatTime: Yup.date().nullable().required('Data é nescessária'),
  time: Yup.date().nullable().required('Hora é nescessária'),
})

type FormCreateTrainingProps = {
  addWebinarTime: () => void
  onSubmit: (data: any) => void
  streamList: IStreamList[]
  removeStreamItem: (index: number) => void
  searchTeachers: (teacherName: string) => Promise<ISelectOption[]>
  searchCategories: (categoryName: string) => Promise<ISelectOption[]>
}

const FormCreateTraining = forwardRef<FormHandles, FormCreateTrainingProps>((props, ref) => {
  const {
    addWebinarTime,
    onSubmit,
    removeStreamItem,
    searchTeachers,
    streamList,
    searchCategories,
  } = props
  const router = useRouter()

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
            <Input name='price' label='Preço' type='number' classes='h-75px' />
            <Input name='discount' label='Desconto' type='number' classes='h-75px' />
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
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-25'>
          <DatePicker
            name='finishDate'
            label='Data de Termino do Treinamento'
            placeholderText='00/00/000'
          />
          <DatePicker name='liveDate' label='Dia da Transmição' placeholderText='00/00/000' />
        </div>
        <div className='w-25'>
          <DatePicker name='chatTime' label='Desativação do chat' placeholderText='00/00/000' />
          <DatePicker
            name='time'
            label='Horário'
            placeholderText='00:00'
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Horas'
            dateFormat='hh:mm'
          />
        </div>

        <button
          type='button'
          onClick={addWebinarTime}
          className='btn btn-lg btn-primary h-45px mb-7 mt-auto'
        >
          <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
          Adicionar Data
        </button>
      </div>

      {streamList.length !== 0 && (
        <LivesTable streamList={streamList} removeStreamItem={removeStreamItem} />
      )}

      <div className='d-flex mt-10'>
        <button
          type='button'
          onClick={() => {
            router.push('/trainings')
          }}
          className='btn btn-lg btn-secondary w-150px mb-5 ms-auto me-10'
        >
          Cancelar
        </button>

        <button type='submit' className='btn btn-lg btn-primary w-180px mb-5'>
          Salvar
        </button>
      </div>
    </Form>
  )
})

FormCreateTraining.displayName = 'FormCreateTraining'

export { FormCreateTraining }
