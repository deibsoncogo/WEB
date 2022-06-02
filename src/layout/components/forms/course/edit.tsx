import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Input, Select, TextArea } from '../../inputs'
import { ICategory } from '../../../../interfaces/api-response/categoryResponse'
import { IGetCategoriesNoPagination } from '../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { toast } from 'react-toastify'
import { IGetAllUsersByRole } from '../../../../domain/usecases/interfaces/user/getAllUsersByRole'
import { IUserPartialResponse } from '../../../../interfaces/api-response/userPartialResponse'
import { roles } from '../../../../application/wrappers/authWrapper'
import { UserQueryRole } from '../../../../domain/models/userQueryRole'
import { IUpdateCourse } from '../../../../domain/usecases/interfaces/course/upDateCourse'
import { IGetCourse } from '../../../../domain/usecases/interfaces/course/getCourse'
import { ICourseResponse } from '../../../../interfaces/api-response/courseResponse'
import { currenceMaskOnlyValue } from '../../../formatters/currenceFormatter'
import { UpdateCourse } from '../../../../domain/models/updateCourse'
import { InputImage } from '../../inputs/input-image'
import { Editor } from '@tinymce/tinymce-react'
import { Loading } from '../../loading/loading'

type Props = {
  updateCourse: IUpdateCourse
  getCategories: IGetCategoriesNoPagination
  getUsers: IGetAllUsersByRole
  getCourse: IGetCourse
  id: string| string[] | undefined
}

export function FormUpdateCourse(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [users, setUsers] = useState<IUserPartialResponse[]>([])
  const [defaultValue, setDefaultValue] = useState<ICourseResponse>()
  const [loadingCourse, setLoadingCourse] = useState(true)
  const [loadingCategories, setLoadingCategoris] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [stateEditor, setStateEditor] = useState({ content: '' })

  useEffect(() => {
    
    if(typeof props.id == "string"){
      props.getCourse
        .get(props.id)
        .then((data) => {        
          setDefaultValue(data)         
          setStateEditor({ content: data.content })
        })
        .catch((error) => toast.error('Não foi possível carregar o curso.'))
        .finally(() => setLoadingCourse(false))
      }
  }, [])

  useEffect(() => {
    props.getCategories
      .get()
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => toast.error('Não foi possível carregar as categorias de cursos.'))
      .finally(() => setLoadingCategoris(false))
  }, [])

  useEffect(() => {
    const userQuery = new UserQueryRole(roles.TEACHER)
    props.getUsers
      .getAllByRole(userQuery)
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => toast.error('Não foi possível carregar os Professores.'))
      .finally(() => setLoadingUsers(false))
  }, [])

  const findCategoryById = (id: string) => {
    return categories.find((category) => category.id == id)
  }

  function handleChange(event: any) {
    setStateEditor({ content: event })
  }

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
        accessTime: Yup.number().required('Tempo de acesso é necessário'),
        price: Yup.string().required('Preço é necessário'),    
        installments: Yup.number().required('Quantidade de parcelas é necessária'),   
        discount: Yup.string().required('Desconto é necessário'),
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
        content: Yup.string().required('Conteúdo progrmático é necessário'),
        userId: Yup.string().optional(),
      })
      data.content= stateEditor.content  
      await schema.validate(data, { abortEarly: false })
      handleUpdateCourse(data)
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

  async function handleUpdateCourse(data: IFormCourse) {
    
    const price = parseFloat(data.price.replace(".", "").replace(',','.'))    
    const discount  = parseFloat(data.discount.replace(".", "").replace(',','.'))  

    const course = new UpdateCourse(
      defaultValue?.id,
      data.name,
      data.description,
      data.content,
      data.categoryId,
      discount,
      'teste1.jpg',
      parseInt(data.installments),
      defaultValue?.isActive,
      price,
      parseInt(data.accessTime),
      data.userId
    )   
    props.updateCourse
      .update(course)
      .then(() => {
        toast.success('Curso atualizado com sucesso!')
        router.push('/courses')
      })
      .catch((error: any) => console.log(error))
  }

  return (    
    <>
    {loadingCourse && loadingCategories && loadingUsers && <Loading/>}
    
    {!(loadingCourse && loadingCategories && loadingUsers) && (<Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
      <h3 className='mb-5'>Informações do Curso</h3>
      <InputImage name='photo' />
      <div className='d-flex flex-row gap-5 w-100'>
        <div className='w-50'>
          <Input name='name' label='Nome' />
          <Select name='userId' label='Professor'>
            {defaultValue?.userId ? (
              <option value={defaultValue.userId}>{defaultValue.teacherName}</option>
            ) : (
              <option value='' disabled selected>
                Selecione
              </option>
            )}
            {users.map((option) => {
              if (defaultValue?.userId) {
                if (option.id != defaultValue.userId) {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  )
                }
              }
            })}
          </Select>
          <Input name='accessTime' type='number' label='Tempo de acesso ao curso (em meses)' />
          <Input
            name='price'
            defaultValue={currenceMaskOnlyValue(defaultValue?.price)}
            label='Preço'
            type='text'
            placeholderText='R$'
            onChange={() => currencyFormatter('price')}
          />
          <Input
            name='discount'
            defaultValue={currenceMaskOnlyValue(defaultValue?.discount)}
            label='Desconto'
            type='text'
            placeholderText='R$'
            onChange={() => currencyFormatter('discount')}
          />
        </div>
        <div className='w-50'>
          <TextArea name='description' label='Descrição' rows={10} />
          <Select name='categoryId' label='Categoria'>
            {defaultValue?.categoryId ? (
              <option value={defaultValue.categoryId}>
                {findCategoryById(defaultValue.categoryId)?.name}
              </option>
            ) : (
              <option value='' disabled selected>
                Selecione
              </option>
            )}
            {categories.map((option) => {
              if (defaultValue?.categoryId) {
                if (option.id != defaultValue.categoryId) {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  )
                }
              }
            })}
          </Select>
          <Input
            name='installments'
            label='Quantidade de Parcelas'
            type='number'            
          /> 
        </div>
      </div>

      <h3 className='mb-5 mt-5'>Conteúdo e Materiais do Curso</h3>
      <h5 className='mb-5 mt-5 text-muted'>Conteúdo Prográmatico do Curso</h5>

      <Editor
        init={{
          plugins:
            'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons',
          menubar: false,
          toolbar:
            'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          height: 300,
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          contextmenu: 'link image table',
        }}
        value={stateEditor.content}
        onEditorChange={handleChange}
      />

      <Input name='content'/>

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
    </Form>)}
    </>
  )
}
