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
import { IGetAllUsersByRole } from '../../../../domain/usecases/interfaces/user/getAllUsersByRole'
import { IUserPartialResponse } from '../../../../interfaces/api-response/userPartialResponse'
import { roles } from '../../../../application/wrappers/authWrapper'
import { UserQueryRole } from '../../../../domain/models/userQueryRole'
import { CreateCourse } from '../../../../domain/models/createCourse'
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  createCourse: ICreateCourse
  getCategories: IGetCategoriesNoPagination
  getUsers: IGetAllUsersByRole
}

export function FormCreateCourse(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [users, setUsers] = useState<IUserPartialResponse[]>([])
  const [loading, setLoading] = useState(true)
  const[stateEditor, setStateEditor] = useState({ content: "" })
 
  function handleChange(event:any) {
    setStateEditor({content: event});
  }

  
  useEffect(() => {     
    console.log( props.getCategories)    
    props.getCategories
      .get()
      .then((data) => {      
        setCategories(data)
      })
      .catch((error) => toast.error("Não foi possível carregar as categorias de cursos."))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {   
    const userQuery = new UserQueryRole(roles.TEACHER)      
    props.getUsers
      .getAllByRole(userQuery)
      .then((data) => {   
        console.log(data)
        setUsers(data)
      })
      .catch((error) => toast.error("Não foi possível carregar os Professores."))
      .finally(() => setLoading(false))
  }, [])

  const currencyFormatter = (name: string) => {
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

  async function handleFormSubmit(data: IFormCourse) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é necessário'),       
        price: Yup.string().required('Preço é necessário'),
        discount: Yup.string().required('Desconto é necessário'),
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
        content:Yup.string().required('Conteúdo progrmático é necessário'),  
        userIdt:Yup.string().optional()  })

      await schema.validate(data, { abortEarly: false })
      handleCreateCourse(data)

    } catch (err) {
      console.log(err)
   
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

  async function handleCreateCourse(data: IFormCourse) {
    
    
    let matchesPrice = data.price.split(',')[0].match(/\d*/g)
    let price = matchesPrice? parseInt(matchesPrice?.join('')): undefined

    let matchesDiscount = data.discount.split(',')[0].match(/\d*/g)
    let discount = matchesDiscount? parseInt(matchesDiscount?.join('')): undefined


    const course = new CreateCourse(data.name, data.description, data.content,
                data.categoryId, discount, "teste.jpg", 3, false, price, data.userId)
  
   
     props.createCourse
       .create(course)
       .then(() => {
        toast.success("Curso criado com sucesso!")
        router.push('/courses')
        })
       .catch((error: any) => console.log(error))
  }

  return (
    <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
      <h3 className='mb-5'>Informações do Curso</h3>
      {/* <InputImage name='photo' /> */}
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-50'>
          <Input name='name' label='Nome' />
          <Select name='userId' label='Professor'>
            <option value='' disabled selected>
              Selecione
            </option>
            {users.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
          <Input name='time' label='Tempo de acesso ao curso (em meses)' />
          <Input
            name='price'
            label='Preço'
            type='text'
            placeholderText='R$'
            onChange={() => currencyFormatter('price')}
          />
          <Input
            name='discount'
            label='Desconto'
            type='text'
            placeholderText='R$'
            onChange={() => currencyFormatter('discount')}
          />
        </div>
        <div className='w-50'>
          <TextArea name='description' label='Descrição' rows={10} />
          <Select name='categoryId' label='Categoria'>
            <option value='' disabled selected>
              Selecione
            </option>
            {categories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <h3 className='mb-5 mt-5'>Conteúdo e Materiais do Curso</h3>
      <h5 className='mb-5 mt-5 text-muted'>Conteúdo Prográmatico do Curso</h5>

    <Editor init={{    
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons',
    menubar: false,
    toolbar: 'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    height: 300,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',    
    contextmenu: 'link image table',
    
  }}  value= {stateEditor.content} onEditorChange={handleChange}/>
  
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


