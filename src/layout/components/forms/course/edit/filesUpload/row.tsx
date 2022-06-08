import { Tooltip } from '@nextui-org/react'
import { FileUpload } from '../../../../../../domain/models/fileUpload'
import { KTSVG } from '../../../../../../helpers'
import { ICourseAttachmentResponse } from '../../../../../../interfaces/api-response/courseAttachmentResponse'


interface IRow {
  name: string
  originalName: string
  fileUpload: ICourseAttachmentResponse
  filesUpload: ICourseAttachmentResponse[]
  IdDeletedFiles: string[]
  filesUploadUpdate: FileUpload[]
  handleRefresher: () => void
}

export function Row(props: IRow) {
  const deleteFile = () => {
    const index = props.filesUpload.indexOf(props.fileUpload, 0)
    if (index > -1) {
      props.filesUpload.splice(index, 1)

      if(props.fileUpload?.id){
        props.IdDeletedFiles.push(props.fileUpload.id)
      }
      else{
        const index = props.filesUploadUpdate.indexOf(props.fileUpload, 0)
        if (index > -1) {
          props.filesUploadUpdate.splice(index, 1)
        }
        
      } 
    }
    props.handleRefresher()
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{props.name}</span>
        </td>

        <td>
          <span className='text-dark fw-bold d-block fs-7'>{props.originalName}</span>
        </td>

        <td className='text-center'>
          <Tooltip content={'Deletar'} rounded color='primary'>
            <a
              onClick={() => {
                deleteFile()
              }}
              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </a>
          </Tooltip>
        </td>
      </tr>
    </>
  )
}
