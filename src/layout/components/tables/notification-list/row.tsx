import { Tooltip } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { IDeleteNotification } from "../../../../domain/usecases/interfaces/notification/deleteNotification"
import { KTSVG } from "../../../../helpers"
import ConfirmationModal from "../../modal/ConfirmationModal"

interface IRow {
  id: string
  tag: string
  text: string
  date: string
  notificationType: string
  deleteNotification: IDeleteNotification
  handleRefresher: () => void;

}

export function Row({
  id,
  tag,
  text,
  date,
  notificationType,
  deleteNotification,
  handleRefresher
 
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  function formatText(articleContent?: string){
    const textLimit = 100  
    const textLimited = articleContent? articleContent.substring(0, articleContent.length >= textLimit? textLimit: articleContent.length): ''  
    return textLimited.length >= textLimit? textLimited + ' ...': textLimited
  }
  
  async function handleDeleteNotification() {
    try {
      setLoading(true)
      await deleteNotification.delete(id)
      setIsModalDeleteOpen(false)
      toast.success('Notificação deletada com sucesso.')  
      handleRefresher()    
    } catch {
      toast.error('Não foi possível deletar a notificação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <tr>
        <td className='ps-4'>
          <span className='text-dark fw-bold d-block fs-7'>{tag}</span>
        </td>
        <td>
          <span
            className='text-dark fw-bold d-block fs-7 mw-200px text-overflow-custom'>
            {formatText(text)}
          </span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{date}</span>
        </td>
        <td>
          <span className='text-dark fw-bold d-block fs-7'>{notificationType}</span>
        </td>              
        <td className='text-end d-flex justify-content-start px-4'>
          <Tooltip content={'Editar'} rounded color='primary'>
            <Link href={`/notification/edit/${id}`}>
              <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                <KTSVG path='/icons/art005.svg' className='svg-icon-3' />
              </button>
            </Link>
          </Tooltip>

          <Tooltip content={'Deletar'} rounded color='primary'>
            <button
              onClick={() => {
                setIsModalDeleteOpen(true)
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            >
              <KTSVG path='/icons/gen027.svg' className='svg-icon-3' />
            </button>
          </Tooltip>
        </td>

        <ConfirmationModal
          isOpen={isModalDeleteOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalDeleteOpen(false)
          }}
          onConfimation={handleDeleteNotification}
          content='Você tem certeza que deseja excluir esta notificação?'
          title='Deletar'
        />      
      </tr>
    </>
  )
}
