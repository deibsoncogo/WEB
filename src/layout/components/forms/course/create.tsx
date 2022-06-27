import {useRef, useState } from 'react'

import { useRouter } from 'next/router'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles} from '@unform/core'

import { Input, InputNumber, Select, TextArea } from '../../inputs'
import { ICreateCourse } from '../../../../domain/usecases/interfaces/course/createCourse'

import { ICategory } from '../../../../interfaces/api-response/categoryResponse'
import { toast } from 'react-toastify'
import { IUserPartialResponse } from '../../../../interfaces/api-response/userPartialResponse'
import { CreateCourse } from '../../../../domain/models/createCourse'
import { Editor } from '@tinymce/tinymce-react'
import { CourseClass } from '../../../../domain/models/courseClass'
import CoursesInternalTable from './courseInternalTable'
import FilesInternalTable from './filesUpload/filesInternalTable'
import { FileUpload } from '../../../../domain/models/fileUpload'
import CustomButton from '../../buttons/CustomButton'
import { appRoutes } from '../../../../application/routing/routes'
import { IGetCategories } from '../../../../domain/usecases/interfaces/category/getCategories'
import { IGetAllUsers } from '../../../../domain/usecases/interfaces/user/getAllUsers'
import { Role } from '../../../../domain/usecases/interfaces/user/role'
import { ISelectOption } from '../../../../domain/shared/interface/SelectOption'
import { SelectAsync } from '../../inputs/selectAsync'
import { InputSingleImage } from '../../inputs/input-single-image'

type Props = {
  createCourse: ICreateCourse
  getCategories: IGetCategories
  getUsers: IGetAllUsers
}

export function FormCreateCourse({createCourse, getCategories, getUsers}: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [registerCourse, setRegisterCourse] = useState(false)
  const [stateEditor, setStateEditor] = useState({ content: '' })
  const [filesUpload] = useState<FileUpload[]>([])
  const [courseClass] = useState<CourseClass[]>([])
  const [hasErrorClass, setHasErrorClass] = useState(false)

  function handleChange(event: any) {
    setStateEditor({ content: event })
  }
 
  const searchTeachers = async (teacherName: string) => {
    try {
      const { data } = await getUsers.getAll({
        name: teacherName,
        order: 'asc',
        page: 1,
        take: 5,
        role: Role.Teacher,
      })

      const teacherOptions: ISelectOption[] = data.map((teacher) => ({
        label: teacher.name,
        value: teacher.id,
      }))

      return teacherOptions
    } catch {
      toast.error('Falha em buscar os professores')
      return []
    }
  }

  const searchCategories = async (categoryName: string) => {
    try {
      const { data } = await getCategories.get({
        name: categoryName,
        order: 'asc',
        page: 1,
        take: 5,
      })

      const categoryOptions: ISelectOption[] = data.map((category) => ({
        label: category.name,
        value: category.id,
      }))

      return categoryOptions
    } catch {
      toast.error('Falha em buscar as categorias')
      return []
    }
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
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Nome é necessário'),
        userId: Yup.string().required('Selecione um professor'),
        accessTime: Yup.number()
          .min(1, 'Tempo de acesso deve ser maior ou igual a 1')
          .typeError('Tempo de acesso deve ser um número')
          .required('Tempo de acesso é necessário'),
        price: Yup.string().required('Preço é necessário'),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior ou igual a 1')
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário'),       
        description: Yup.string().required('Descriçao é necessária'),
        categoryId: Yup.string().required('Selecione uma categoria'),
      })

      data.content = stateEditor.content
      await schema.validate(data, { abortEarly: false })
      courseClass.length == 0 ? setHasErrorClass(true) : handleCreateCourse(data)
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
  async function handleCreateCourse(data: IFormCourse) {
    const price = data.price.replace('.', '').replace(',', '.')
    const discount = data.discount.replace('.', '').replace(',', '.')
    const course = new CreateCourse(
      data.name,
      data.description,
      data.content,
      data.categoryId,
      discount,
      data.installments,
      false,
      price,
      data.accessTime,
      data.userId,
      courseClass
    )

    const formData = new FormData();
    if(data?.image){
      formData.append('image', data.image); 
      filesUpload?.forEach(file => {
        if(file?.file)
           formData.append('attachments', file.file)
        formData.append('filesName',  file.name)
      })
    }
    formData.append('course', JSON.stringify(course))

    setRegisterCourse(true)
       createCourse
      .create(formData)
      .then(() => {
        toast.success('Curso criado com sucesso!')
        router.push('/courses')
      })
      .catch(() => toast.error('Não foi possível criar o curso!'))
      .finally(() => setRegisterCourse(false))         
      
  }

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informações do Curso</h3>
        <InputSingleImage name='image' />
        <div className='d-flex flex-row gap-5 w-100'>
          <div className='w-50'>
            <Input name='name' label='Nome' />
            <SelectAsync
              searchOptions={searchTeachers}
              name='userId'
              label='Professor'
              classes='h-75px'
              placeholder='Digite o nome do professor'
            />
            
            <InputNumber name='accessTime' label='Tempo de acesso ao curso (em meses)' />          
            <Input
              name='price'
              label='Preço'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('price')}
            />
            <Input
              name='discount'
              label='Desconto'
              type='text'
              placeholderText='R$ 0,00'
              onChange={() => currencyFormatter('discount')}
            />
          </div>
          <div className='w-50'>
            <TextArea name='description' label='Descrição' style={{ minHeight: '236px', margin: 0 }}
            />
            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
            />
            <InputNumber name='installments' label='Quantidade de Parcelas' />           
          </div>
        </div>

        <h3 className='mb-5 mt-5 text-muted'>Conteúdo e Materiais do Curso</h3>
        <h5 className='mb-5 mt-5'>Conteúdo Prográmatico do Curso</h5>

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

        <Input name='content' hidden={true} />

        <h3 className='mb-5 mt-5 text-muted'>Arquivos</h3>
        <FilesInternalTable filesUpload={filesUpload} formRef={formRef} />

        {hasErrorClass && (
          <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
            <strong>Não é possível criar curso!</strong>
            Você precisa adicionar, no mínimo, uma aula.
            <button
              type='button'
              onClick={() => setHasErrorClass(false)}
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
          </div>
        )}
        <h3 className='mb-5 mt-5 text-muted'>Aulas</h3>
        <CoursesInternalTable courseClassArray={courseClass} formRef={formRef} />

        <div className='d-flex mt-10'>
         
          <CustomButton
            customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            loading={registerCourse}
            onClick={() => {
              router.push(appRoutes.COURSES)
            }}
          />
          <CustomButton
            type='submit'
            customClasses={['w-180px', 'btn-primary']}
            title='Salvar'
            disabled={registerCourse}
          />
          
          </div>
      </Form>
    </>
  )
}
