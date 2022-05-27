import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { formatDate, formatTime, KTSVG } from '../../../../helpers'
import { levelOptions } from '../../../../utils/selectOptions'

import { DatePicker, Input, Select, TextArea } from '../../inputs'
import { InputImage } from '../../inputs/input-image'
import { LivesTable } from '../../tables/lives-list'

interface IStreamList {
  liveDate: string
  time: string
  start: boolean
}

export function FormEditTrainings({ data }: IEditTrainingsForm) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState<ITrainings>({} as ITrainings)
  const [streamList, setStreamList] = useState<IStreamList[]>([])

  useEffect(() => {
    setDefaultValue(data)
  }, [])

  async function handleFormSubmit(data: any) {
    if (!formRef.current) throw new Error()
    console.log(data)

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é Nescessário'),
        teacher: Yup.string().required('Professor é nescessário'),
        price: Yup.number().required('Preço é nescessário'),
        description: Yup.string().required('Descriçao é nescessário'),
        categories: Yup.string().required('Selecione uma categoria'),
        finishDate: Yup.date().nullable().required('Data é nescessária'),
        liveDate: Yup.date().nullable().required('Data é nescessária'),
        chatTime: Yup.date().nullable().required('Data é nescessária'),
        time: Yup.date().nullable().required('Hora é nescessária'),
      })
      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  function addLiveTime() {
    const liveData = {
      liveDate: formatDate(formRef.current?.getData().liveDate, 'DD/MM/YYYY'),
      time: formatTime(formRef.current?.getData().time, 'HH:mm'),
      start: false,
    }
    if (liveData.liveDate === 'Invalid date' || liveData.time === 'Invalid date') return
    setStreamList([...streamList, liveData])
  }

  function removeStreamItem(index: number) {
    const temp = streamList.slice()
    temp.splice(index, 1)
    setStreamList(temp)
  }

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <h3 className='mb-5'>Informações do Treinamento</h3>
      <InputImage name='photo' />

      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-50'>
          <Input name='name' label='Nome' />
          <Input name='teacher' label='Professor' />
          <Input name='price' label='Preço' type='number' />
          <Input name='discount' label='Desconto' type='number' />
        </div>

        <div className='w-50'>
          <TextArea name='description' label='Descrição' rows={10} />
          <Select name='categories' label='Categorias'>
            <option value='' disabled selected>
              Selecione
            </option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
          onClick={addLiveTime}
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
            router.push('/users')
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
}
