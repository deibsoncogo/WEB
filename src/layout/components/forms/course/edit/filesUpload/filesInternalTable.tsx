import { FormHandles } from '@unform/core'
import { ChangeEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { DeleteFileUpload } from '../../../../../../domain/models/deleteFile'
import { FileUpload } from '../../../../../../domain/models/fileUpload'
import { KTSVG } from '../../../../../../helpers'
import { ICourseAttachmentResponse } from '../../../../../../interfaces/api-response/courseAttachmentResponse'
import { Input } from '../../../../inputs'
import { Row } from './row'


type prop = {
  filesUpload: ICourseAttachmentResponse[]
  IdDeletedFiles: DeleteFileUpload[]
  filesUploadUpdate: FileUpload[]
  formRef: RefObject<FormHandles>
}

let currentId = 0

function getNewId() {
  return ++currentId
}

export default function FilesInternalTable(props: prop) {
  const [fileName, setname] = useState<string>()
  const [file, setFile] = useState<File>()
  const [hasError, setHasError] = useState<boolean>(false)
  const [refresher, setRefresher] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)


  const handleRefresher = () => {
    setRefresher(!refresher)
  }
  const handleInputFile = () => {
    inputRef.current?.click()
  }

  const handleUploadFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const fileUpload = e.target.files?.[0]

     if (!fileUpload )     
       return
    
    props.formRef.current?.setFieldValue('Arquivo', fileUpload?.name)
    setFile(fileUpload )
      
  }, [])

  async function handleFileSubmit() {
    
    if (fileName && file) {    
               
      const fileObject = {name: fileName, originalName: file.name, file}     
      props.filesUpload.push(fileObject)      
      props.filesUploadUpdate.push(fileObject)
      props.formRef.current?.clearField('fileName')
      props.formRef.current?.clearField('Arquivo')
      handleRefresher()
    } else {
      setHasError(true)
      setMessageError('Você precisa informar o nome do arquivo e/ou fazer upload')
    }
    
  }

  return (
    <>
      {hasError && (
        <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
          <strong>Não é possível adicionar arquivo!</strong>
          {messageError}.
          <button
            type='button'
            onClick={() => setHasError(false)}
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
          ></button>
        </div>
      )}

      <div className='d-flex flex-row align-middle gap-5'>
        
        <Input
          name='fileName'
          label='Nome'
          type='text'
          onChange={(event) => setname(event.target.value)}
        />

        <Input readOnly name='Arquivo' label='Arquivo' type='text'/>

        <div className='fv-row d-flex align-items-center '>
          <input
            ref={inputRef}
            accept='pdf/application'
            type='file'
            onChange={handleUploadFiles}
            className='d-none'
          />
          
          <a className='btn btn-sm border border-primary btn-active-color-primary' onClick={handleInputFile}>
          <KTSVG path='/icons/fil010.svg' className='svg-icon-2 svg-icon-primary' />
            Selecionar arquivo
          </a>
        </div>

        <div className='fv-row d-flex align-items-center '>
          <a onClick={handleFileSubmit} className='btn btn-sm btn-primary'>
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Adicionar arquivo
          </a>
        </div>
      </div>

      {props.filesUpload.length > 0 && (
        <div className='card mb-5 mb-xl-8'>
          <div className='py-3 float-start'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th className='text-dark ps-4 min-w-200px rounded-start'>Nome</th>
                    <th className='text-dark min-w-500px'>Arquivo</th>                  
                    <th className='text-dark min-w-50px text-center rounded-end' />
                  </tr>
                </thead>

                <tbody>
                  {props?.filesUpload?.map((item) => (
                    <Row
                      key={getNewId()}
                      name={item.name}
                      originalName={item.originalName}
                      fileUpload={item}
                      filesUpload={props.filesUpload}
                      IdDeletedFiles= {props.IdDeletedFiles}
                      filesUploadUpdate= {props.filesUploadUpdate}
                      handleRefresher={handleRefresher}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
