import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { Input, TextArea } from "../../../../inputs"


type Props = {

}

export function VideoFreeContentForm() {

  return (
    <>
        <div className='w-50 mt-5'>
            <Input name='title' label='Título' />
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '150px', margin: 0 }}
            />
            <Input name='link' label='Link' />
        </div>   
 
    </>
  )
}
