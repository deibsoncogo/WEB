import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { appRoutes } from "../../../../../application/routing/routes"
import { Button } from "../../../buttons/CustomButton"
import { InputRadio } from "../../../inputs/input-radio"
import * as Yup from 'yup'
import { ICreateFreeContent } from "../../../../../domain/usecases/interfaces/freeContent/createFreeContent"
import { toast } from "react-toastify"
import { VideoFreeContentForm } from "../create/video/videoForm"
import { TextFreeContentForm } from "../create/text/textForm"
import { IGetFreeContent } from "../../../../../domain/usecases/interfaces/freeContent/getFreeContent"


type UpdateFreeContentProps = {
    getFreeContent: IGetFreeContent
    updateFreeContent: ICreateFreeContent

}

export function UpdateFreeContentForm({getFreeContent, updateFreeContent}: UpdateFreeContentProps) {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [contentType, setContentType] = useState<string>('')
  const [registerFreeContent, setRegisterFreeContent] = useState(false)
  const [stateEditor, setStateEditor] = useState({ content: '' })

  function handleChangeStateEditor(value: string) { 
    if(formRef && formRef.current?.getFieldError('content')){    
        formRef.current?.setFieldError('content', '')         
    }    
    setStateEditor({ content: value })
  }

  function formatDataToSend(data: IFormFreeContent) {

    const formData = new FormData()
    if (data?.image) formData.append('image', data?.image)    
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('contentType', data.contentType)
    data?.link? formData.append('link', String(data?.link)): ''
    data?.authorName? formData.append('authorName', String(data?.authorName)): ''
    data?.content? formData.append('articleContent', String(data?.content)): ''
    return formData
  }
 
  async function handleFormSubmit(data: IFormFreeContent) {
    
    data.contentType = contentType
    data.content = stateEditor.content
    if (!formRef.current) throw new Error()
    try {
      formRef.current.setErrors({})
      const schema = Yup.object().shape({      
        title: Yup.string().required('Título é necessário'),
        description: Yup.string().required('Descriçao é necessária'),
        contentType: Yup.string().required('Tipo do conteúdo é necessário'),
        link: Yup.string().when('contentType', {
            is: (value: string) => value && value === "video",
            then: Yup.string().matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Insira um link válido'
            ).required('Link é necessário'),
        }),
        imagePreview: Yup.string().when('contentType', {
            is: (value: string) => value && value === "text",
            then: Yup.string().required('Imagem é necessária'),
        }),
        authorName: Yup.string().when('contentType', {
            is: (value: string) => value && value === "text",
            then: Yup.string().required('O nome do autor é necessário'),
        }),
        content: Yup.string().when('contentType', {
            is: (value: string) => value && value === "text",
            then: Yup.string().required('O conteúdo do artigo é obrigatório'),
        }),
     
      })

      await schema.validate(data, { abortEarly: false })      
      updateFreeContentRequest(data)

    } catch (err) {   
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        contentType? formRef.current.setErrors(validationErrors): formRef.current.setErrors({}) 
      }
    }
  }

  async function updateFreeContentRequest(data: IFormFreeContent) {

    // const dataToSubmit = formatDataToSend(data)
    // setRegisterFreeContent(true)
    // createFreeContent
    //    .create(dataToSubmit)
    //    .then(() => {
    //      toast.success('Conteúdo criado com sucesso!')
    //      router.push(appRoutes.CONTENTS)
    //    })
    //    .catch(() => toast.error('Não foi possível criar o conteúdo!'))
    //    .finally(() => setRegisterFreeContent(false))
  }

  return (
    <>
       <Form className='form' ref={formRef} onSubmit={handleFormSubmit}>
        <h3 className='mb-5 text-muted'>Informações do conteúdo</h3>
        
        <div className='container p-0 m-0'>
            <div className='col'>
                <h3 className='fs-6 fw-bolder text-dark'>Tipo</h3>
                <InputRadio name='contentType' label='Em vídeo' value='video' setContentType={setContentType}/>
                <InputRadio name='contentType' label='Em texto' value='text' setContentType={setContentType}/> 
                {contentType === 'video' && <VideoFreeContentForm/>}
                {contentType === 'text' && <TextFreeContentForm stateEditor={stateEditor} handleChangeStateEditor={handleChangeStateEditor}/>}
            </div>  

        </div>  
        
        <div className='d-flex mt-10'>
          <Button
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            disabled={registerFreeContent}
            onClick={() => {
              router.push(appRoutes.CONTENTS)
            }}
          />
          <Button
            type='submit'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'    
            disabled={registerFreeContent}
            loading={registerFreeContent}       
          />
        </div>
        </Form>
    </>
  )
}
