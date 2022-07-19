import { Tooltip } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { IDeleteNotification } from "../../../../domain/usecases/interfaces/notification/deleteNotification"
import { IToggleNotificationStatus } from "../../../../domain/usecases/interfaces/notification/toggleNotificationStatus"
import { KTSVG } from "../../../../helpers"
import { Switch } from "../../inputs"
import ConfirmationModal from "../../modal/ConfirmationModal"

interface IRow {
  id: string
  tag: string
  text: string
  date: string
  notificationType: string
  isActive: boolean
  toggleStatus: IToggleNotificationStatus 
  deleteNotification: IDeleteNotification
  handleRefresher: () => void

}

export function Row({
  id,
  tag,
  text,
  date,
  notificationType,
  isActive,
  toggleStatus,
  deleteNotification,
  handleRefresher
 
}: IRow) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
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

  
  async function handleUpdateNotification() {
    try {
      setLoading(true)
      await toggleStatus.toggle({ id })
      setIsModalUpdateOpen(false)
      toast.success('Notificação atualizada com sucesso.')
      handleRefresher()
    } catch (err) {
      toast.error('Não foi possível atualizar a notificação.')
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

        <td>
          <Switch active={isActive} setModalUpdate={setIsModalUpdateOpen} />
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

        <ConfirmationModal
          isOpen={isModalUpdateOpen}
          loading={loading}
          onRequestClose={() => {
            setIsModalUpdateOpen(false)
          }}
          onConfimation={handleUpdateNotification}
          content='Você tem certeza que deseja alterar o status desta notificação?'
          title='Confirmação'
        />

      </tr>
    </>
  )
}
