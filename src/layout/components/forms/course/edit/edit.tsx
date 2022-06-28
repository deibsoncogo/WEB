import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Input, InputNumber, Select, TextArea } from '../../../inputs'
import { ICategory } from '../../../../../interfaces/api-response/categoryResponse'
import { IGetCategoriesNoPagination } from '../../../../../domain/usecases/interfaces/category/getAllGategoriesNoPagination'
import { toast } from 'react-toastify'
import { IGetAllUsersByRole } from '../../../../../domain/usecases/interfaces/user/getAllUsersByRole'
import { IUserPartialResponse } from '../../../../../interfaces/api-response/userPartialResponse'
import { roles } from '../../../../../application/wrappers/authWrapper'
import { UserQueryRole } from '../../../../../domain/models/userQueryRole'
import { IUpdateCourse } from '../../../../../domain/usecases/interfaces/course/upDateCourse'
import { IGetCourse } from '../../../../../domain/usecases/interfaces/course/getCourse'
import { ICourseResponse } from '../../../../../interfaces/api-response/courseResponse'
import { currenceMaskOnlyValue } from '../../../../formatters/currenceFormatter'
import { UpdateCourse } from '../../../../../domain/models/updateCourse'
import { Editor } from '@tinymce/tinymce-react'
import { Loading } from '../../../loading/loading'
import { IGetAllAttachmentByCourseId } from '../../../../../domain/usecases/interfaces/courseAttachment/getAllAttachmentByCourseId'
import { IGetAllCourseClassByCourseId } from '../../../../../domain/usecases/interfaces/courseClass/getAllCourseClassByCourseId'
import { ICourseAttachmentResponse } from '../../../../../interfaces/api-response/courseAttachmentResponse'
import { ICourseClassResponse } from '../../../../../interfaces/api-response/courseClassResponse'
import { FileUpload } from '../../../../../domain/models/fileUpload'
import CoursesInternalTable from './courseClass/courseInternalTable'
import { CourseClass } from '../../../../../domain/models/courseClass'
import FilesInternalTable from './filesUpload/filesInternalTable'
import { DeleteFileUpload } from '../../../../../domain/models/deleteFile'
import { appRoutes } from '../../../../../application/routing/routes'
import { Button as CustomButton } from '../../../buttons/CustomButton'
import { InputSingleImage } from '../../../inputs/input-single-image'
import { FullLoading } from '../../../FullLoading/FullLoading'

type Props = {
  updateCourse: IUpdateCourse
  getCategories: IGetCategoriesNoPagination
  getUsers: IGetAllUsersByRole
  getAttachments: IGetAllAttachmentByCourseId
  getCourseClass: IGetAllCourseClassByCourseId
  getCourse: IGetCourse
  id: string | string[] | undefined
}

export function FormUpdateCourse(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [users, setUsers] = useState<IUserPartialResponse[]>([])
  const [attachments, setAttachment] = useState<ICourseAttachmentResponse[]>([])
  const [courseClass, setCourseClass] = useState<ICourseClassResponse[]>([])
  const [hasErrorClass, setHasErrorClass] = useState(false)
  const [defaultValue, setDefaultValue] = useState<ICourseResponse>()
 
  const [loading, setLoading] = useState(true)
  const [updateCourse, setUpdateCourse] = useState(false)
  const [stateEditor, setStateEditor] = useState({ content: '' })

  const [IdDeletedFiles] = useState<DeleteFileUpload[]>([])
  const [filesUploadUpdate] = useState<FileUpload[]>([])

  const [IdDeletedCourseClass] = useState<string[]>([])
  const [courseClassUpdate] = useState<CourseClass[]>([])

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
      courseClass.length == 0 ? setHasErrorClass(true) : handleUpdateCourse(data)
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
    const price = data.price.replace('.', '').replace(',', '.')
    const discount = data.discount.replace('.', '').replace(',', '.')

    const course = new UpdateCourse(
      defaultValue?.id,
      data.name,
      data.description,
      data.content,
      data.categoryId,
      discount,
      defaultValue?.imageUrl,
      data.installments,
      defaultValue?.isActive,
      price,
      data.accessTime,
      data.userId,
      courseClassUpdate,
      IdDeletedFiles
    )

    const formData = new FormData()
    if (data?.image) {
      formData.append('image', data?.image)
    }

    if (filesUploadUpdate) {
      filesUploadUpdate?.map((file) => {
        if (file?.file) formData.append('attachments', file.file)
        formData.append('filesName', file.name)
      })
    }

    if (IdDeletedCourseClass.length > 0) {
      IdDeletedCourseClass.forEach((id) => {
        formData.append('deleteCourses', id)
      })
    }
    formData.append('course', JSON.stringify(course))

    setUpdateCourse(true)
    props.updateCourse
      .update(formData)
      .then(() => {
        toast.success('Curso atualizado com sucesso!')
        router.push('/courses')
      })
      .catch(() => toast.error('Não foi possível atualizar o curso!'))
      .finally(() => setUpdateCourse(false))
  }

  async function fetchData() {
    try{      

      if (typeof props.id == 'string') {
       const data =  await props.getCourse.get(props.id)
       console.log(data)
       formRef.current?.setFieldValue('imagePreview', data.imageUrl) 
       formRef.current?.setFieldValue('installments', data.installments)
       formRef.current?.setFieldValue('accessTime', data?.accessTime)
       setDefaultValue(data)
       setStateEditor({ content: data.content })
       setAttachment(await props.getAttachments.getAllByCourseId(props.id))
       setCourseClass(await props.getCourseClass.getAllByCourseId(props.id))
      }       
      setCategories(await props.getCategories.get())
      setUsers(await props.getUsers.getAllByRole(new UserQueryRole(roles.TEACHER)))     
    }
    catch(error){
      toast.error("Não foi possível carregar os dados")
    }
    finally{
      setLoading(false)
    }

  }
 
  useEffect(() => {
    fetchData()      
  }, [])

  
  return (
    <>
      {loading && <FullLoading />}      
        <Form className='form' ref={formRef} initialData={defaultValue} onSubmit={handleFormSubmit}>
          <h3 className='mb-5'>Informações do Curso</h3>
          <InputSingleImage name='image' />
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
              <InputNumber name='accessTime' label='Tempo de acesso ao curso (em meses)' />
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
              <TextArea name='description' label='Descrição' style={{ minHeight: '236px', margin: 0 }} />
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
              <InputNumber name='installments' label='Quantidade de Parcelas'/>  
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

          <Input name='content' hidden={true} />

          <h3 className='mb-5 mt-5 text-muted'>Arquivos</h3>
          <FilesInternalTable
            filesUpload={attachments}
            IdDeletedFiles={IdDeletedFiles}
            filesUploadUpdate={filesUploadUpdate}
            formRef={formRef}
          />

          {hasErrorClass && (
            <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
              <strong>Não é possível atualizar o curso!</strong>O curso deve possuir, no mínimo, uma
              aula.
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
          <CoursesInternalTable
            courseClassArray={courseClass}
            IdDeletedCourseClass={IdDeletedCourseClass}
            courseClassUpdate={courseClassUpdate}
            formRef={formRef}
          />

          <div className='d-flex mt-10'>
            <CustomButton
              customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
              title='Cancelar'
              type='button'
              loading={updateCourse}
              onClick={() => {
                router.push(appRoutes.COURSES)
              }}
            />
            <CustomButton
              type='submit'
              customClasses={['w-180px', 'btn-primary']}
              title='Salvar'
              disabled={updateCourse}
            />          
          </div>
        </Form>      
    </>
  )
}
