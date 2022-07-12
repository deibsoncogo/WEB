import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { Input, InputCurrence, InputNumber, TextArea } from "../../../inputs"
import { InputRadio } from "../../../inputs/input-radio"

type Props = {

}

export function CreateFreeContentForm() {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)

  const [contentType, setContentType] = useState<string>('')


  return (
    <>
       <Form className='form' ref={formRef} onSubmit={()=> console.log}>
        <h3 className='mb-5 text-muted'>Informações do conteúdo</h3>
        
        <div className='d-flex flex-row gap-5 w-100'>
            <div className='w-50'>
            <h3 className='fs-6 fw-bolder text-dark'>Tipo</h3>
            <InputRadio name='contentType' label='Em vídeo' value='video' setContentType={setContentType}/>
            <InputRadio name='contentType' label='Em texto' value='text' setContentType={setContentType}/> 
            </div>
        </div>  

  
        </Form>
    </>
  )
}
