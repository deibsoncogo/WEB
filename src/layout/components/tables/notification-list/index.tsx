import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../application/hooks/usePagination'
import { IDeleteNotification } from '../../../../domain/usecases/interfaces/notification/deleteNotification'
import {
  GetNotificationParams,
  IGetAllNotification,
} from '../../../../domain/usecases/interfaces/notification/getAllNotification'
import { KTSVG } from '../../../../helpers'
import { debounce } from '../../../../helpers/debounce'
import { INotificationResponse } from '../../../../interfaces/api-response/notificationResponse'
import { Loading } from '../../loading/loading'
import { Pagination } from '../../pagination/Pagination'
import { ItemNotFound } from '../../search/ItemNotFound'
import { Search } from '../../search/Search'
import { Row } from './row'
import { IToggleNotificationStatus } from '../../../../domain/usecases/interfaces/notification/toggleNotificationStatus'
import { ICreateNotification } from '../../../../domain/usecases/interfaces/notification/createNotification'
import { FormHandles } from '@unform/core'
import { NotificationDrawer } from '../../forms/notification/notificationDrawer'
import * as Yup from 'yup'
import router from 'next/router'
import { appRoutes } from '../../../../application/routing/routes'
import { INotification } from '../../../../domain/models/notification'
import { IUpdateNotification } from '../../../../domain/usecases/interfaces/notification/updateNotification'
import { Socket } from 'socket.io-client'
import { SocketNotificationEvents } from '../../../../domain/models/socketNotificationEvents'
import { getSocketConnection } from '../../../../utils/getSocketConnection'
import { useRequest } from '../../../../application/hooks/useRequest'
import { IJoinNotification } from '../../../../domain/usecases/interfaces/notification/join-notification'

type NotificationTableProps = {
  getAllNotification: IGetAllNotification
  toggleStatus: IToggleNotificationStatus
  joinNotification: IJoinNotification
}

let socket: Socket | null

export function NotificationTable({
  getAllNotification,
  toggleStatus,
  joinNotification,
}: NotificationTableProps) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [notification, setNotification] = useState<INotificationResponse[]>([])
  const [notificationToUpdate, setNotificationToUpdate] = useState<INotification>()
  const [notificationQuery, setNotificationQuery] = useState('')

  const [isDrawerNotificationOpen, setIsDrawerNotificationOpen] = useState(false)
  const notificationFormRef = useRef<FormHandles>(null)
  const [loadingAction, setLoadingAction] = useState(false)

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-180px') => {
    return `text-dark ps-4 ${minWidth} cursor-pointer ${getClassToCurrentOrderColumn(name)}`
  }

  const { makeRequest: joinNotificationRequest, data: accessToken } = useRequest<IJoinNotification>(
    joinNotification.join
  )

  const socketInitializer = (tokenChat: string) => {
    socket = getSocketConnection(SocketNotificationEvents.Notification, tokenChat)
    socket.connect()

    socket.on(SocketNotificationEvents.ConnectError, () => {
      toast.error('Falha ao se conectar com o servidor!')
    })
  }

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchNotification = debounce((text: string) => {
    setNotificationQuery(text)
  })

  const handleOpenModalNotification = (data?: INotification) => {
    if (data) {
      setNotificationToUpdate(data)
      notificationFormRef.current?.setFieldValue('tag', data.tag)
      notificationFormRef.current?.setFieldValue('text', data.text)
      notificationFormRef.current?.setFieldValue('notificationType', data.notificationType)
      notificationFormRef.current?.setFieldValue('notificationType-label', data.notificationType)
    }
    setIsDrawerNotificationOpen(true)
  }

  const handleCloseModalNotification = () => {
    notificationFormRef.current?.reset()
    notificationFormRef.current?.setErrors({})
    setIsDrawerNotificationOpen(false)
    setNotificationToUpdate(undefined)
  }

  const handleCreateNotification = (data: IFormNotification) => {
    try {
      setLoadingAction(true)
      socket?.emit(
        SocketNotificationEvents.CreateNotification,
        { ...data, isActive: false },
        () => {
          router.push(appRoutes.ALERTS)
          toast.success('Notifica????o cadastrada com sucesso!')
          setLoadingAction(false)
          handleCloseModalNotification()
          handleRefresher()
        }
      )
    } catch {
      toast.error('N??o foi poss??vel criar a notifica????o!')
    }
  }

  const handleUpdateNotification = (data: IFormNotification) => {
    try {
      setLoadingAction(true)
      socket?.emit(
        SocketNotificationEvents.UpdateNotification,
        { id: notificationToUpdate?.id, isActive: notificationToUpdate?.isActive, ...data },
        () => {
          router.push(appRoutes.ALERTS)
          toast.success('Notifica????o editada com sucesso!')
          setLoadingAction(false)
          setNotificationToUpdate(undefined)
          handleCloseModalNotification()
          handleRefresher()
        }
      )
    } catch {
      toast.error('N??o foi poss??vel atualizar a notifica????o!')
    }
  }

  async function handleFormSubmit(data: IFormNotification) {
    if (!notificationFormRef.current) throw new Error()
    try {
      notificationFormRef.current.setErrors({})
      const schema = Yup.object().shape({
        tag: Yup.string().required('Tag ?? necess??ria'),
        text: Yup.string().required('Texto ?? necess??rio'),
        notificationType: Yup.string().required('Tipo ?? necess??rio'),
      })

      await schema.validate(data, { abortEarly: false })
      notificationToUpdate ? handleUpdateNotification(data) : handleCreateNotification(data)
    } catch (err) {
      const validationErrors = {}
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          // @ts-ignore
          validationErrors[error.path] = error.message
        })
        notificationFormRef.current.setErrors(validationErrors)
      }
    }
  }

  useEffect(() => {
    joinNotificationRequest()
  }, [])

  useEffect(() => {
    if (!socket && accessToken) {
      socketInitializer(String(accessToken))
    }
    return () => {
      if (socket) {
        socket.removeAllListeners(SocketNotificationEvents.ConnectError)
        socket.disconnect()
        socket = null
      }
    }
  }, [accessToken])

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
      .catch(() => toast.error('N??o foi poss??vel listar as notifica????es!'))
      .finally(() =>
        setTimeout(() => {
          setLoading(false)
        }, 500)
      )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, notificationQuery])

  return (
    <>
      <NotificationDrawer
        isUpdate={Boolean(notificationToUpdate)}
        visible={isDrawerNotificationOpen}
        close={handleCloseModalNotification}
        handleFormSubmit={handleFormSubmit}
        loading={loadingAction}
        ref={notificationFormRef}
      />

      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search onChangeText={handleSearchNotification} />
          </h3>
          <div className='card-toolbar' onClick={() => handleOpenModalNotification()}>
            <button className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Nova notifica????o
            </button>
          </div>
        </div>

        {notification.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-2 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('tag') + ' rounded-start'}
                      onClick={() => handleOrdenation('tag')}
                    >
                      Tag
                    </th>
                    <th
                      className={getColumnHeaderClasses('text')}
                      onClick={() => handleOrdenation('text')}
                    >
                      Texto
                    </th>
                    <th
                      className={getColumnHeaderClasses('notificationType min-w-100px')}
                      onClick={() => handleOrdenation('notificationType')}
                    >
                      Tipo
                    </th>

                    <th
                      className={getColumnHeaderClasses('isActive', 'min-w-100px')}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Push
                    </th>
                    <th
                      className='text-dark min-w-100px text-end rounded-end'
                      style={{ verticalAlign: 'middle', paddingRight: '3.5rem' }}
                    >
                      A????o
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    notification?.map((item) => (
                      <Row
                        key={item.id}
                        notification={item}
                        toggleStatus={toggleStatus}
                        openModalToUpdate={handleOpenModalNotification}
                        socket={socket}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {notification.length == 0 && !loading && (
          <ItemNotFound message='Notifica????o n??o encontrada' />
        )}

        {loading && <Loading />}

        <div className='card d-flex flex-row justify-content-end align-items-center ps-9 pe-9 pb-5'>
          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
