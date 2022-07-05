import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, InputCurrence, InputNumber, SelectAsync, TextArea } from '../../inputs'

import { toast } from 'react-toastify'
import { IFormBook } from '../../../../interfaces/forms/create-book'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { ICreateBook } from '../../../../domain/usecases/interfaces/book/createBook'
import { InputSingleImage } from '../../inputs/input-single-image'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { getAsyncCategoiesToSelectInput } from '../../../templates/trainings/utils/getAsyncCategoriesToSelectInput'
import { IGetCategories } from '../../../../domain/usecases/interfaces/category/getCategories'

type FormCreateBookProps = {
  remoteGetCategories: IGetCategories
  remoteCreateBook: ICreateBook
}

export function FormCreateBook({ remoteGetCategories, remoteCreateBook }: FormCreateBookProps) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [defaultValue, setDefaultValue] = useState({})
  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])

  async function handleCreateBook(data: IFormBook) {
    const formData = new FormData()

    formData.append('image', data.image)
    formData.append('name', String(data.name))
    formData.append('author', String(data.author))
    formData.append('stock', String(data.stock))
    formData.append('price', onlyNums(String(data.price)))
    formData.append('discount', onlyNums(String(data.discount)))
    formData.append('description', String(data.description))
    formData.append('categoryId', String(data.categoryId))
    formData.append('installments', String(data.installments))
    formData.append('id', String(data.id))
    formData.append('isActive', String(false))

    await remoteCreateBook
      .create(formData)
      .then(() => {
        router.push('/books')
        toast.success('Livro criado com sucesso!')
      })
      .catch((error: any) => {
        toast.error(error.messages[0])
      })
  }

  const handleGetAsyncCategoriesToSelectInput = async (categoryName: string) => {
    return getAsyncCategoiesToSelectInput({ categoryName, remoteGetCategories })
  }

  const handlePopulateSelectInput = async () => {
    try {
      const categoryOptions = await handleGetAsyncCategoriesToSelectInput('')

      setDefaultCategoryOptions(categoryOptions)
    } catch (err) {
      toast.error('Não foi possível carregar as categorias de cursos.')
    }
  }

  useEffect(() => {
    handlePopulateSelectInput()
  }, [])

  async function handleFormSubmit(data: IFormBook) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      data.price = onlyNums(data.price)
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Título é necessário'),
        author: Yup.string().required('Autor é necessário'),
        stock: Yup.number()       
        .min(1, 'Quantidade de estoque deve ser maior que zero')
        .required('Estoque é necessário'),
        price: Yup.number().required('Preço é necessário')
         .min(0.1, 'Preço deve ser maior que zero'),           
        discount: Yup.string().required('Desconto é necessária'),
        description: Yup.string().required('Descrição é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
        installments: Yup.number()
          .required('Quantidade de parcelas é necessário')
          .min(1, 'Quantidade de parcelas deve ser maior que zero'),
      })

      await schema.validate(data,  { abortEarly: false })

      handleCreateBook(data)
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
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados do Livro</h3>

          <InputSingleImage name='image' />
          <div className='d-flex justify-content-start flex-row '>
            <div
              className='d-flex justify-content-center flex-column w-100'
              style={{
                marginRight: '10%',
              }}
            >
              <Input name='name' label='Título' type='text' classes='h-75px' />
              <Input name='author' label='Autor' type='text' classes='h-75px' />
              <InputNumber name='stock' label='Estoque'  classes='h-75px'/>              
              <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
              <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
            </div>
            <div className='d-flex justify-content-start flex-column w-100'>
              <TextArea name='description' label='Descrição' rows={10} />

              <SelectAsync
                searchOptions={handleGetAsyncCategoriesToSelectInput}
                name='categoryId'
                label='Categoria'
                classes='h-75px'
                placeholder='Digite o nome da categoria'
                defaultOptions={defaultCategoryOptions}
              />

              <InputNumber name='installments' label='Quantidade de Parcelas' classes='h-75px' />
            </div>
          </div>
        </div>
      </div>

      <div className='mb-10 d-flex justify-content-end'>
        <button
          type='button'
          onClick={() => {
            router.push('/books')
          }}
          style={{ marginRight: '10px' }}
          className='btn btn-lg btn-secondary w-150px mr-10'
        >
          Cancelar
        </button>

        <button type='submit' className='btn btn-lg btn-primary w-180px'>
          Salvar
        </button>
      </div>
    </Form>
  )
}
