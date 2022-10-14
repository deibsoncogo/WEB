import { Editor } from '@tinymce/tinymce-react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { appRoutes } from '../../../../../application/routing/routes'
import { DeleteFileUpload } from '../../../../../domain/models/deleteFile'
import { FileUpload } from '../../../../../domain/models/fileUpload'
import { UpdateCourse } from '../../../../../domain/models/updateCourse'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { IGetCourse } from '../../../../../domain/usecases/interfaces/course/getCourse'
import { IUpdateCourse } from '../../../../../domain/usecases/interfaces/course/upDateCourse'
import { IGetAllAttachmentByCourseId } from '../../../../../domain/usecases/interfaces/courseAttachment/getAllAttachmentByCourseId'
import { IGetAllCourseClassByCourseId } from '../../../../../domain/usecases/interfaces/courseClass/getAllCourseClassByCourseId'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { ICourseAttachmentResponse } from '../../../../../interfaces/api-response/courseAttachmentResponse'
import { ICourseClassResponse } from '../../../../../interfaces/api-response/courseClassResponse'
import { ICourseResponse } from '../../../../../interfaces/api-response/courseResponse'
import { maskedToMoney, onlyNums } from '../../../../formatters/currenceFormatter'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { Button } from '../../../buttons/CustomButton'
import { FullLoading } from '../../../FullLoading/FullLoading'
import { Input, InputCurrence, InputNumber, SelectAsync, TextArea } from '../../../inputs'
import { InputSingleImage } from '../../../inputs/input-single-image'
import CoursesInternalTable from './courseClass/courseInternalTable'
import FilesInternalTable from './filesUpload/filesInternalTable'

type Props = {
  updateCourse: IUpdateCourse
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

  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  function handleChange(event: any) {
    setStateEditor({ content: event })
  }

  async function handleFormSubmit(data: IFormCourse) {
    if (!formRef.current) throw new Error()
    try {
      formRef.current.setErrors({})
      data.price = onlyNums(data.price)
      data.discount = onlyNums(data?.discount)
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem é necessária'),
        name: Yup.string().required('Nome é necessário').max(50, 'No máximo 50 caracteres'),
        userId: Yup.string().required('Selecione um professor'),
        accessTime: Yup.number()
          .min(1, 'Tempo de acesso deve ser maior que zero')
          .typeError('Tempo de acesso deve ser um número')
          .required('Tempo de acesso é necessário'),
        price: Yup.number()
          .required('Preço é necessário')
          .min(0.01, 'Preço deve ser maior que zero'),
        discount: Yup.number().test({
          name: 'validation',
          message: 'Desconto deve ser menor que preço',
          test: (value) =>
            value ? parseFloat(data.discount + '') < parseFloat(data.price + '') : true,
        }),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior que zero')
          .typeError('Quantidade de parcelas deve ser um número')
          .required('Quantidade de parcelas é necessário'),
        description: Yup.string()
          .required('Descriçao é necessária')
          .max(65535, 'Descrição muito longa'),
        level: Yup.string().required('Nível é necessário').max(50, 'No máximo 50 caracteres'),
      })

      data.content = stateEditor.content
      await schema.validate({ ...data, price: onlyNums(data.price) }, { abortEarly: false })
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

  async function handleUpdateCourse(data: IFormCourse) {
    const price = onlyNums(data.price)
    const discount = onlyNums(data.discount)

    courseClass.forEach((item, index) => (item.displayOrder = index + 1))

    const course = new UpdateCourse(
      defaultValue?.id,
      data.name,
      data.description,
      data.content,
      data.level,
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
        toast.success('Curso editado com sucesso!')
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
        formRef.current?.setFieldValue('level', data.level)
        formRef.current?.setFieldValue('imagePreview', data.imageUrl)
        formRef.current?.setFieldValue('installments', data.installments)
        formRef.current?.setFieldValue('accessTime', data?.accessTime)
        formRef.current?.setFieldValue('price', maskedToMoney(data.price))
        formRef.current?.setFieldValue('discount', maskedToMoney(data.discount))
        setDefaultValue(data)
        setStateEditor({ content: data.content })
        setAttachment(await props.getAttachments.getAllByCourseId(props.id))
        setCourseClass(await props.getCourseClass.getAllByCourseId(props.id))
      }
      setDefaultTeacherOptions(await searchTeachers(''))
    } catch (error) {
      toast.error('Não foi possível carregar os dados!')
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
            <InputCurrence name='price' label='Preço' type='text' classes='h-75px' />
            <InputCurrence name='discount' label='Desconto' type='text' classes='h-75px' />
          </div>
          <div className='w-50'>
            <TextArea name='description' label='Descrição' style={{ minHeight: '236px', margin: 0 }} />
            <Input name='level' label='Nível' />
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

        <h3 className='mb-5 mt-5 text-muted'>Aulas</h3>
        {hasErrorClass && (
          <div
            className='text-danger'
            style={{
              position: 'relative',
              top: '-15px',
            }}
          >
            É necessário adicionar pelo menos 1 aula
          </div>
        )}
        <CoursesInternalTable
          courseClassArray={courseClass}
          setCourseClass={setCourseClass}
          IdDeletedCourseClass={IdDeletedCourseClass}
          formRef={formRef}
        />

        <div className='d-flex mt-10'>
          <Button
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            onClick={() => {
              router.push(appRoutes.COURSES)
            }}
          />
          <Button
            type='submit'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'
            disabled={updateCourse}
            loading={updateCourse}
          />
        </div>
      </Form>
    </>
  )
}
