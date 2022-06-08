import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import * as Yup from 'yup'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, Select, TextArea } from '../../inputs'
import { InputImage } from '../../inputs/input-image'
import { ActionModal } from '../../modals/action'

import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { ICategory } from '../../../../interfaces/api-response/categoryResponse'

import { IFormBook } from '../../../../interfaces/forms/create-book'
import { IGetBooks } from '../../../../domain/usecases/interfaces/book/getBooks'

import { IBookResponse } from '../../../../interfaces/api-response/bookResponse'
import { currencyFormatter } from '../../../../utils/currencyFormatter'

type FormCreateBookProps = {
  getAllCategories: IGetCategoriesNoPagination

  getBookById: IGetBooks
  id: string | string[] | undefined
}

export function FormUpdateBook({ getAllCategories, id, getBookById }: FormCreateBookProps) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const [defaultValue, setDefaultValue] = useState({})
  const [categories, setCategories] = useState<ICategory[]>()

  const [book, setBook] = useState<IBookResponse>()

  async function handleCreateBook() {}

  const handleBookCreate = async (data: IFormBook) => {
    console.log('passou em tudo')
  }

  const getCategories = async () => {
    if (id)
      await getAllCategories.get().then((res) => {
        console.log('res', res)
        setCategories(res)
      })
  }

  const getBook = async () => {
    if (id)
      await getBookById.get({ id }).then((res) => {
        console.log('res', res)
        setBook(res)
      })
  }

  useEffect(() => {
    getBook()
  }, [getBookById])

  useEffect(() => {
    getCategories()
  }, [getAllCategories])

  async function handleFormSubmit(data: IFormBook) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é necessário'),
        author: Yup.string().required('Autor é necessário'),
        stock: Yup.number().required('Estoque é necessário'),
        price: Yup.string().required('Preço é necessário'),
        discount: Yup.string().required('Desconto é necessária'),
        description: Yup.string().required('Descrição é necessária'),
        category: Yup.string().required('Selecione uma categoria'),
      })

      await schema.validate(data, { abortEarly: false })
      setIsOpenModal(true)
      handleBookCreate(data)
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
          {book && (
            <>
              <InputImage name='file' />
              <div className='d-flex justify-content-start flex-row '>
                <div
                  className='d-flex justify-content-center flex-column w-100'
                  style={{
                    marginRight: '10%',
                  }}
                >
                  <Input name='title' label='Título' type='text' defaultValue={book.name} />
                  <Input name='author' label='Autor' type='text' defaultValue={book.author} />
                  <Input name='stock' label='Estoque' type='number' defaultValue={book.stock} />
                  <Input
                    name='price'
                    label='Preço'
                    type='text'
                    placeholderText='R$'
                    onChange={() => currencyFormatter('price', formRef.current)}
                    defaultValue={book.price}
                  />
                  <Input
                    name='discount'
                    label='Desconto'
                    type='text'
                    placeholderText='R$'
                    onChange={() => currencyFormatter('price', formRef.current)}
                    defaultValue={book.discount}
                  />
                </div>
                <div className='d-flex justify-content-start flex-column w-100'>
                  <TextArea
                    name='description'
                    label='Descrição'
                    rows={10}
                    defaultValue={book.description}
                  />

                  <Select name='category' label='Categorias'>
                    {book.category && (
                      <option key={book.id} value={book.category.name}>
                        {book.category.name}
                      </option>
                    )}

                    {categories &&
                      categories.map((option) =>
                        option.name !== book.category.name ? (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ) : null
                      )}
                  </Select>
                </div>
              </div>
            </>
          )}
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
      <ActionModal
        isOpen={isOpenModal}
        modalTitle='Criar'
        message='Você tem certeza que deseja atualizar esse livro?'
        action={handleCreateBook}
        onRequestClose={() => {
          setIsOpenModal(false)
        }}
      />
    </Form>
  )
}
