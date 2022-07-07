import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Input, InputCurrence, InputNumber, SelectAsync, TextArea } from '../../../inputs'
import { toast } from 'react-toastify'
import { IUpdateCourse } from '../../../../../domain/usecases/interfaces/course/upDateCourse'
import { IGetCourse } from '../../../../../domain/usecases/interfaces/course/getCourse'
import { ICourseResponse } from '../../../../../interfaces/api-response/courseResponse'
import {
  currenceMaskOnlyValue,
  maskedToMoney,
  onlyNums,
} from '../../../../formatters/currenceFormatter'
import { UpdateCourse } from '../../../../../domain/models/updateCourse'
import { Editor } from '@tinymce/tinymce-react'
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
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { getAsyncCategoiesToSelectInput } from '../../../../templates/trainings/utils/getAsyncCategoriesToSelectInput'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { IGetCategories } from '../../../../../domain/usecases/interfaces/category/getCategories'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'

type Props = {
  updateCourse: IUpdateCourse
  getCategories: IGetCategories
  getUsers: IGetAllUsers
  getAttachments: IGetAllAttachmentByCourseId
  getCourseClass: IGetAllCourseClassByCourseId
  getCourse: IGetCourse
  id: string | string[] | undefined
}

export function FormUpdateCourse(props: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

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

  const [defaultCategoryOptions, setDefaultCategoryOptions] = useState<ISelectOption[]>([])
  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  function handleChange(event: any) {
    setStateEditor({ content: event })
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
          .min(1, 'Tempo de acesso deve ser maior que zero')
          .typeError('Tempo de acesso deve ser um número')
          .required('Tempo de acesso é necessário'),
        price: Yup.string().required('Preço é necessário'),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior que zero')
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

  const searchTeachers = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers: props.getUsers })
  }

  const searchCategories = async (categoryName: string) => {
    return getAsyncCategoiesToSelectInput({
      categoryName,
      remoteGetCategories: props.getCategories,
    })
  }

  async function handleUpdateCourse(data: IFormCourse) {
    const price = onlyNums(data.price)
    const discount = onlyNums(data.discount)

    courseClass.forEach((item, index) => (item.displayOrder = index + 1))

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
      courseClass,
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
    try {
      if (typeof props.id == 'string') {
        const data = await props.getCourse.get(props.id)
        formRef.current?.setFieldValue('userId', data.userId)
        formRef.current?.setFieldValue('userId-label', data.teacherName)
        formRef.current?.setFieldValue('categoryId', data.categoryId)
        formRef.current?.setFieldValue('categoryId-label', data.categoryName)
        formRef.current?.setFieldValue('imagePreview', data.imageUrl)
        formRef.current?.setFieldValue('installments', data.installments)
        formRef.current?.setFieldValue('accessTime', data?.accessTime)
        formRef.current?.setFieldValue('price', maskedToMoney(data?.price))
        formRef.current?.setFieldValue('discount', maskedToMoney(data?.discount))
        setDefaultValue(data)
        setStateEditor({ content: data.content })
        setAttachment(await props.getAttachments.getAllByCourseId(props.id))
        setCourseClass(await props.getCourseClass.getAllByCourseId(props.id))
      }
      setDefaultTeacherOptions(await searchTeachers(''))
      setDefaultCategoryOptions(await searchCategories(''))
    } catch (error) {
      toast.error('Não foi possível carregar os dados')
    } finally {
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
            <SelectAsync
              searchOptions={searchTeachers}
              name='userId'
              label='Professor'
              classes='h-75px'
              placeholder='Digite o nome do professor'
              defaultOptions={defaultTeacherOptions}
            />
            <InputNumber name='accessTime' label='Tempo de acesso ao curso (em meses)' />
            <InputCurrence name='price' label='Preço' />
            <InputCurrence name='discount' label='Desconto' type='text' />
          </div>
          <div className='w-50'>
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '236px', margin: 0 }}
            />
            <SelectAsync
              searchOptions={searchCategories}
              name='categoryId'
              label='Categoria'
              classes='h-75px'
              placeholder='Digite o nome da categoria'
              defaultOptions={defaultCategoryOptions}
            />
            <InputNumber name='installments' label='Quantidade de Parcelas' />
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
          setCourseClass={setCourseClass}
          IdDeletedCourseClass={IdDeletedCourseClass}
          formRef={formRef}
        />

        <div className='d-flex mt-10'>
          <CustomButton
            customClasses={['btn-secondary', 'w-150px', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            onClick={() => {
              router.push(appRoutes.COURSES)
            }}
          />
          <CustomButton
            type='submit'
            customClasses={['w-180px', 'btn-primary']}
            loading={updateCourse}
            title='Salvar'
            disabled={updateCourse}
          />
        </div>
      </Form>
    </>
  )
}
