import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { KTSVG } from '../../../../helpers'
import { levelOptions } from '../../../../utils/selectOptions'

import { Input, Select, TextArea } from '../../inputs'
import { ICreateCourse } from '../../../../domain/usecases/interfaces/course/createCourse'

import { ICategory } from '../../../../interfaces/api-response/categoryResponse'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { toast } from 'react-toastify'



type Props = {
  createCourse: ICreateCourse
  getCategories: IGetCategoriesNoPagination
}

export function FormCreateCourse(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [defaultValue, setDefaultValue] = useState({})

  useEffect(() => {         
    props.getCategories
      .get()
      .then((data) => {   
       setCategories(data)
      })
      .catch((error) => toast.error("Não foi possível carregar as categorias de cursos."))
      .finally(() => setLoading(false))
  }, [])











  const currenyFormatter = (name: string) => {
    var value = formRef.current?.getFieldValue(name)

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ',$1')

    if (value.length > 6) {
      value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }
    formRef.current?.setFieldValue(name, value)
    if (value == 'NaN') formRef.current?.setFieldValue(name, '')
  }

  

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()

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

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <h3 className='mb-5'>Informações do Curso</h3>
      {/* <InputImage name='photo' /> */}
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-50'>
          <Input name='name' label='Nome' />
          <Select name='professor' label='Professor'>
            <option value='' disabled selected>
              Selecione
            </option>
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input name='teacher' label='Tempo de acesso ao curso' />
          <Input
            name='price'
            label='Preço'
            type='text'
            placeholderText='R$'
            onChange={() => currenyFormatter('price')}
          />
          <Input
            name='discount'
            label='Desconto'
            type='text'
            placeholderText='R$'
            onChange={() => currenyFormatter('discount')}
          />
        </div>
        <div className='w-50'>
          <TextArea name='description' label='Descrição' rows={10} />
          <Select name='categories' label='Categoria'>
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

      <h3 className='mb-5 mt-5'>Conteúdo e Materiais do Curso</h3>
      <h5 className='mb-5 mt-5 text-muted'>Conteúdo Prográmatico do Curso</h5>
      
      <TextArea name='description' rows={10} />
         
      <div className='d-flex mt-10'>
        <button
          type='button'
          onClick={() => {
            router.push('/courses')
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
function setLoading(arg0: boolean): void {
  throw new Error('Function not implemented.')
}

