import { Editor } from '@tinymce/tinymce-react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { appRoutes } from '../../../../../application/routing/routes'
import { CourseClass } from '../../../../../domain/models/courseClass'
import { CreateCourse } from '../../../../../domain/models/createCourse'
import { FileUpload } from '../../../../../domain/models/fileUpload'
import { ISelectOption } from '../../../../../domain/shared/interface/SelectOption'
import { ICreateCourse } from '../../../../../domain/usecases/interfaces/course/createCourse'
import { IGetAllUsers } from '../../../../../domain/usecases/interfaces/user/getAllUsers'
import { onlyNums } from '../../../../formatters/currenceFormatter'
import { getAsyncTeachersToSelectInput } from '../../../../templates/trainings/utils/getAsyncTeachersToSelectInput'
import { Button } from '../../../buttons/CustomButton'
import { Input, InputCurrence, InputNumber, TextArea } from '../../../inputs'
import { InputSingleImage } from '../../../inputs/input-single-image'
import { SelectAsync } from '../../../inputs/selectAsync'
import FilesInternalTable from '../filesUpload/filesInternalTable'
import CoursesInternalTable from './courseInternalTable'

type Props = {
  createCourse: ICreateCourse
  getUsers: IGetAllUsers
}

export function FormCreateCourse({ createCourse, getUsers }: Props) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [registerCourse, setRegisterCourse] = useState(false)
  const [stateEditor, setStateEditor] = useState({ content: '' })
  const [filesUpload] = useState<FileUpload[]>([])
  const [courseClass, setCourseClass] = useState<CourseClass[]>([])
  const [hasErrorClass, setHasErrorClass] = useState(false)

  const [defaultTeacherOptions, setDefaultTeacherOptions] = useState<ISelectOption[]>([])

  function handleChange(event: any) {
    setStateEditor({ content: event })
  }

  const searchTeachers = async (teacherName: string) => {
    return getAsyncTeachersToSelectInput({ teacherName, remoteGetTeachers: getUsers })
  }

  async function handleFormSubmit(data: IFormCourse) {
    if (!formRef.current) throw new Error()

    try {
      formRef.current.setErrors({})
      data.price = onlyNums(data.price)
      data.discount = onlyNums(data?.discount)
      const schema = Yup.object().shape({
        imagePreview: Yup.string().required('Imagem ?? necess??ria'),
        name: Yup.string().required('Nome ?? necess??rio').max(50, 'No m??ximo 50 caracteres'),
        userId: Yup.string().required('Selecione um professor'),
        accessTime: Yup.number()
          .min(1, 'Tempo de acesso deve ser maior que zero')
          .typeError('Tempo de acesso deve ser um n??mero')
          .required('Tempo de acesso ?? necess??rio'),
        price: Yup.number()
          .required('Pre??o ?? necess??rio')
          .min(0.01, 'Pre??o deve ser maior que zero'),
        discount: Yup.number().test({
          name: 'validation',
          message: 'Desconto deve ser menor que pre??o',
          test: (value) =>
            value ? parseFloat(data.discount + '') < parseFloat(data.price + '') : true,
        }),
        installments: Yup.number()
          .min(1, 'Quantidade de parcelas deve ser maior que zero')
          .typeError('Quantidade de parcelas deve ser um n??mero')
          .required('Quantidade de parcelas ?? necess??rio'),
        description: Yup.string()
          .required('Descri??ao ?? necess??ria')
          .max(65535, 'Descri????o muito longa'),
        level: Yup.string().required('N??vel ?? necess??rio'),
      })

      data.content = stateEditor.content
      await schema.validate({ ...data, price: onlyNums(data.price) }, { abortEarly: false })
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
    courseClass.forEach((item, index) => (item.displayOrder = index + 1))

    const course = new CreateCourse(
      data.name,
      data.description,
      data.content,
      data.level,
      data.discount,
      data.installments,
      false,
      data.price,
      data.accessTime,
      data.userId,
      courseClass
    )

    const formData = new FormData()
    if (data?.image) {
      formData.append('image', data.image)
      filesUpload?.forEach((file) => {
        if (file?.file) formData.append('attachments', file.file)
        formData.append('filesName', file.name)
      })
    }
    formData.append('course', JSON.stringify(course))

    setRegisterCourse(true)
    createCourse
      .create(formData)
      .then(() => {
        toast.success('Curso cadastrado com sucesso!')
        router.push('/courses')
      })
      .catch(() => toast.error('N??o foi poss??vel criar o curso!'))
      .finally(() => setRegisterCourse(false))
  }

  async function fetchData() {
    try {
      setDefaultTeacherOptions(await searchTeachers(''))
    } catch (error) {
      toast.error('N??o foi poss??vel carregar os dados!')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informa????es do Curso</h3>
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
            <InputCurrence name='price' label='Pre??o' type='text' classes='h-75px' />
            <InputCurrence name='discount' label='Desconto' />
          </div>
          <div className='w-50'>
            <TextArea name='description' label='Descri????o' style={{ minHeight: '236px', margin: 0 }} />
            <Input name='level' label='N??vel' />
            <InputNumber name='installments' label='Quantidade de Parcelas' />
          </div>
        </div>

        <h3 className='mb-5 mt-5 text-muted'>Conte??do e Materiais do Curso</h3>
        <h5 className='mb-5 mt-5'>Conte??do Program??tico do Curso</h5>

        <Editor
          apiKey={process.env.TINY_MCE_KEY}
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

        <h3 className='mb-5 mt-5 text-muted'>Aulas</h3>
        {hasErrorClass && (
          <div
            className='text-danger'
            style={{
              position: 'relative',
              top: '-15px',
            }}
          >
            ?? necess??rio adicionar pelo menos 1 aula
          </div>
        )}
        <CoursesInternalTable
          setCourseClass={setCourseClass}
          courseClassArray={courseClass}
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
            disabled={registerCourse}
            loading={registerCourse}
          />
        </div>
      </Form>
    </>
  )
}
