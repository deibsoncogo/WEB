import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { usePagination } from "../../../../application/hooks/usePagination"
import { IDeleteNotification } from "../../../../domain/usecases/interfaces/notification/deleteNotification"
import { GetNotificationParams, IGetAllNotification } from "../../../../domain/usecases/interfaces/notification/getAllNotification"
import { KTSVG } from "../../../../helpers"
import { debounce } from "../../../../helpers/debounce"
import { INotificationResponse} from "../../../../interfaces/api-response/notificationResponse"
import { Loading } from "../../loading/loading"
import { Pagination } from "../../pagination/Pagination"
import { ItemNotFound } from "../../search/ItemNotFound"
import { Search } from "../../search/Search"
import { Row } from "./row"
import { dateMask } from "../../../formatters/dateFormatter"

type NotificationTableProps = {
  getAllNotification: IGetAllNotification
  deleteNotification: IDeleteNotification
}

export function NotificationTable({ getAllNotification, deleteNotification }: NotificationTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [notification, setNotification] = useState<INotificationResponse[]>([])
  const [notificationQuery, setNotificationQuery] = useState('')

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  useEffect(() => {
     const paginationParams: GetNotificationParams = {
       take: pagination.take,
       order: pagination.order,
       orderBy: pagination.orderBy,
       page: pagination.currentPage,
       name: notificationQuery,
     }
     getAllNotification
       .getAll(paginationParams)
       .then((data) => {
         setNotification(data.data)
         setTotalPage(data.total)
       })
       .catch(() => toast.error('Não foi possível listar as notificações.'))
       .finally(() =>
         setTimeout(() => {
           setLoading(false)
         }, 500)
       )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, notificationQuery])

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchnotification = debounce((text: string) => {
    setNotificationQuery(text)
  })

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search onChangeText={handleSearchnotification} />
          </h3>
          <div className='card-toolbar'>
            <Link href='/notification/create'>
              <a className='btn btn-sm btn-light-primary'>
                <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                Novo Conteúdo
              </a>
            </Link>
          </div>
        </div>

        {notification.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('title')}
                      onClick={() => handleOrdenation('title')}
                    >
                      Título
                    </th>
                    <th
                      className={getColumnHeaderClasses('description', 'min-w-150px')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Descrição
                    </th>
                    <th
                      className={getColumnHeaderClasses('contentType')}
                      onClick={() => handleOrdenation('contentType')}
                    >
                      Tipo
                    </th>
                    <th
                      className={getColumnHeaderClasses('link')}
                      onClick={() => handleOrdenation('link')}
                    >
                      Link
                    </th>                
                    <th
                      className={getColumnHeaderClasses('articleContent', 'min-w-150px')}
                      onClick={() => handleOrdenation('articleContent')}
                    >
                      Texto
                    </th>
                    <th className='text-dark min-w-80px text-start rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    notification?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        tag={item.tag}
                        text={item.text}
                        date={dateMask(item.date)}
                        notificationType={item.notificatonType}                       
                        deleteNotification={deleteNotification} 
                        handleRefresher={handleRefresher}                       
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {notification.length == 0 && !loading && <ItemNotFound message='Notificação não encontrada' />}

        {loading && <Loading/>}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div />

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
