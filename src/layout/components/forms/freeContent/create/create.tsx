import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { appRoutes } from "../../../../../application/routing/routes"
import { Button } from "../../../buttons/CustomButton"
import { InputRadio } from "../../../inputs/input-radio"
import { VideoFreeContentForm } from "./video/videoForm"

type Props = {

}

export function CreateFreeContentForm() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [contentType, setContentType] = useState<string>('')
  
  async function handleFormSubmit(data: any) {
    data.contentType = contentType
   console.log(data)
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
            </div>  

        </div>  
        
        <div className='d-flex mt-10'>
          <Button
            customClasses={['btn-secondary', 'px-20', 'ms-auto', 'me-10']}
            title='Cancelar'
            type='button'
            onClick={() => {
              router.push(appRoutes.CONTENTS)
            }}
          />
          <Button
            type='submit'
            customClasses={['px-20', 'btn-primary']}
            title='Salvar'           
          />
        </div>
        </Form>
    </>
  )
}
