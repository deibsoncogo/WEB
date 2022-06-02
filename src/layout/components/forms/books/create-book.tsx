import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, TextArea } from '../../inputs'
import { InputImage } from '../../inputs/input-image'
import { ActionModal } from '../../modals/action'

type Props = {}

export function FormCreateBook({}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [defaultValue, setDefaultValue] = useState({})

  async function handleFormSubmit(data: IFormCreateUser) {
    if (!formRef.current) throw new Error()
    setIsOpenModal(true)
  }
  async function handleCreateBook() {}
  return (
    <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-100'>
          <h3 className='mb-5'>Dados do Livro</h3>

          <InputImage name='file' />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginRight: '10%',
              }}
            >
              <Input name='title' label='Título' type='text' />
              <Input name='author' label='Autor' type='text' />
              <Input name='inventory' label='Estoque' />
              <Input name='price' label='Preço' type='number' />
              <Input name='discount' label='Desconto' type='number' />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <TextArea name='description' label='Descrição' />
              <Input name='category' label='Categoria' type='text' />
            </div>
          </div>
        </div>
      </div>

      <div className='mb-10 d-flex justify-content-end'>
        <button
          type='button'
          onClick={() => {
            router.push('/users')
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
