import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ICreateBook } from '../../../../domain/usecases/interfaces/book/createBook'
import { IFormBook } from '../../../../interfaces/forms/create-book'
import { onlyNums } from '../../../formatters/currenceFormatter'
import { Button } from '../../buttons/CustomButton'
import { Input, InputCurrence, InputNumber, TextArea } from '../../inputs'
import { InputSingleImage } from '../../inputs/input-single-image'

type FormCreateBookProps = {
  remoteCreateBook: ICreateBook
}

export function FormCreateBook({ remoteCreateBook }: FormCreateBookProps) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [registerBook, setRegisterBook] = useState(false)

  async function handleCreateBook(data: IFormBook) {
    const formData = new FormData()

    formData.append('image', data.image)
    formData.append('name', String(data.name))
    formData.append('author', String(data.author))
    formData.append('stock', String(data.stock))
    formData.append('price', onlyNums(String(data.price)))
    formData.append('discount', onlyNums(String(data.discount)))
    formData.append('description', String(data.description))
    formData.append('level', String(data.level))
    formData.append('installments', String(data.installments))
    formData.append('id', String(data.id))
    formData.append('isActive', String(false))

    setRegisterBook(true)

    await remoteCreateBook
      .create(formData)
      .then(() => {
        router.push('/books')
        toast.success('Livro cadastrado com sucesso!')
      })
      .catch((error: any) => {
        if (Array.isArray(error.messages?.[0])) {
          toast.error(`${error.messages?.[0]}!`)
          return
        }
        toast.error(`${error.message}!`)
      })
      .finally(() => {
        setRegisterBook(false)
      })
  }

  async function handleFormSubmit(data: IFormBook) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})

      data.price = onlyNums(data.price)
      data.discount = onlyNums(data?.discount)
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Título é necessário'),
        author: Yup.string().required('Autor é necessário'),
        stock: Yup.number()
          .min(1, 'Quantidade de estoque deve ser maior que zero')
          .required('Estoque é necessário'),
        price: Yup.number()
          .required('Preço é necessário')
          .min(0.1, 'Preço deve ser maior que zero'),
        discount: Yup.number().test({
          name: 'validation',
          message: 'Desconto deve ser menor que preço',
          test: (value) =>
            value ? parseFloat(data.discount + '') < parseFloat(data.price + '') : true,
        }),
        description: Yup.string().required('Descrição é necessária'),
        level: Yup.string().required('Nível é necessário').max(50, 'No máximo 50 caracteres'),
        installments: Yup.number()
          .required('Quantidade de parcelas é necessário')
          .min(1, 'Quantidade de parcelas deve ser maior que zero'),
      })

      await schema.validate(data, { abortEarly: false })

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
    <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5 text-muted'>Informações do Livro</h3>

          <InputSingleImage name='image' />
          <div className='d-flex justify-content-start flex-row gap-5'>
            <div className='d-flex justify-content-center flex-column w-100'>
              <Input name='name' label='Título' type='text' classes='h-75px' />
              <Input name='author' label='Autor' type='text' classes='h-75px' />
              <InputNumber name='stock' label='Estoque' classes='h-75px' />
              <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
              <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
            </div>
            <div className='d-flex justify-content-start flex-column w-100'>
              <TextArea name='description' label='Descrição' style={{ minHeight: '240px', margin: 0 }} />
              <Input name='level' label='Nível' />
              <InputNumber name='installments' label='Quantidade de Parcelas' classes='h-75px' />
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex mt-10'>
        <Button
          type='button'
          title='Cancelar'
          onClick={() => {
            router.push('/books')
          }}
          customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
        />

        <Button
          type='submit'
          title='Salvar'
          disabled={registerBook}
          customClasses={['px-20', 'btn-primary']}
          loading={registerBook}
        />
      </div>
    </Form>
  )
}
