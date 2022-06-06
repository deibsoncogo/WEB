import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { CourseClass } from '../../../../domain/models/courseClass'
import { KTSVG } from '../../../../helpers'
import { Input } from '../../inputs'
import { Row } from './row'

type prop = {
  courseClassArray: CourseClass[]
}

let currentId = 0;

function getNewId() { 
  return ++currentId;
}

export default function FilesInternalTable(props: prop) {
  const [nameFile, setNameFile] = useState<string>()
  const [originalName, setOriginalName] = useState<string>()
  const [file, setFile] = useState<File>()
  const [hasError, setHasError] = useState<boolean>(false)
  const [refresher, setRefresher] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')

  useEffect(() => {}, [refresher])

  const handleRefresher = () => {
    setRefresher(!refresher)
  }

  const handleUploadFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setOriginalName(file?.name)
    setFile(file)
    // if (!file) {
    //   setPreview(null)
    //   return
    // }   
    // const previewURL = URL.createObjectURL(file)
    // setPreview(previewURL)
    
    // if(handleSingleImageUpload)
    //    handleSingleImageUpload(file)  
    
  }, [])

  async function handleClassSubmit() {
    /*
    if (nameClass && link && displayOrder) {
      if (
        !link.match(
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        ) ||
        displayOrder == 0
      ) {
        setHasError(true)
        setMessageError('Link inválido e/ou ordem de exibição igual a 0 (zero)')
        return
      }

      props.courseClassArray.push(new CourseClass(nameClass, link, displayOrder))
      handleRefresher()
    } else {
      setHasError(true)
      setMessageError('Você precisa preencher todos os campos')
    }
    */
  }

  return (
    <>
      {hasError && (
        <div className='alert alert-danger d-flex alert-dismissible fade show' role='alert'>
          <strong>Não é possível adicionar aula!</strong>
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

      <div className='d-flex flex-row w-100 align-middle gap-5'>
        <Input
          name='nameFile'
          label='Nome'
          type='text'
          onChange={(event) => setNameFile(event.target.value)}
        />

        <Input
          readOnly
          name='Arquivo'
          label='Arquivo'
          type='text'
          value={originalName}         
        />

    <div className='fv-row d-flex align-items-center '>
       
     <label htmlFor='upload-photo' className='btn btn-sm btn-primary'>
        <input
          id='upload-photo'
          type='file'
          onChange={handleUploadFiles}
          className='d-none'        
        />
        Selecionar arquivo
      </label>
    </div>

        <div className='fv-row d-flex align-items-center '>
          <a onClick={handleClassSubmit} className='btn btn-sm btn-primary'>
            <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
            Adicionar aula
          </a>
        </div>
      </div>

      {props.courseClassArray.length > 0 && (
        <div className='card mb-5 mb-xl-8'>
          <div className='py-3 float-start'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th className='text-dark ps-4 min-w-200px rounded-start'>Nome</th>
                    <th className='text-dark min-w-200px'>Link</th>
                    <th className='text-dark min-w-200px'>Ordem de exibição</th>
                    <th className='text-dark min-w-100px text-end rounded-end' />
                  </tr>
                </thead>

                <tbody>
                  {props?.courseClassArray?.map((item) => (
                    <Row
                      key={getNewId()}
                      name={item.name}
                      link={item.link}
                      displayOrder={item.displayOrder}
                      classCourse={item}
                      courseClassArray={props.courseClassArray}
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
