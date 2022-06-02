import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, Select, TextArea } from '../../inputs'
import { InputImage } from '../../inputs/input-image'
import { ActionModal } from '../../modals/action'
import { useRequest } from '../../../../application/hooks/useRequest'
import {
  GetCategoriesParams,
  OutputPagination,
} from '../../../../domain/usecases/interfaces/category/getCategories'
import { makeRemoteGetCategories } from '../../../../application/factories/usecases/categories/remote-getCategories-factory'
import { usePagination } from '../../../../application/hooks/usePagination'

type Props = {}

export function FormCreateBook({}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const paginationHook = usePagination()

  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage } = pagination
  const paginationParams: GetCategoriesParams = { page: currentPage, take, name: '' }
  const [defaultValue, setDefaultValue] = useState({})

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()
    setIsOpenModal(true)
  }

  async function handleCreateBook() {}

  const { makeRequest: getCategories, data: paginatedCategories } = useRequest<
    OutputPagination,
    GetCategoriesParams
  >(makeRemoteGetCategories().get)

  useEffect(() => {
    getCategories(paginationParams)
  }, [pagination.take, pagination.currentPage])

  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados do Livro</h3>

          <InputImage name='file' />
          <div className='d-flex justify-content-start flex-row '>
            <div
              className='d-flex justify-content-center flex-column w-100'
              style={{
                marginRight: '10%',
              }}
            >
              <Input name='title' label='Título' type='text' />
              <Input name='author' label='Autor' type='text' />
              <Input name='inventory' label='Estoque' />
              <Input name='price' label='Preço' type='number' />
              <Input name='discount' label='Desconto' type='number' />
            </div>
            <div className='d-flex justify-content-start flex-column w-100'>
              <TextArea name='description' label='Descrição' />

              <Select name='category' label='Categorias'>
                <option value='' disabled selected>
                  Selecione
                </option>
                {paginatedCategories?.data.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Select>
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
      <ActionModal
        isOpen={isOpenModal}
        modalTitle='Criar'
        message='Você tem certeza que deseja criar esse livro?'
        action={handleCreateBook}
        onRequestClose={() => {
          setIsOpenModal(false)
        }}
      />
    </Form>
  )
}
