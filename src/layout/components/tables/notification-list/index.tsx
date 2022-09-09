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

type NotificationTableProps = {
  createNotification: ICreateNotification
  updateNotification: IUpdateNotification
  getAllNotification: IGetAllNotification
  toggleStatus: IToggleNotificationStatus
  deleteNotification: IDeleteNotification
}

export function NotificationTable({
  createNotification,
  updateNotification,
  getAllNotification,
  toggleStatus,
  deleteNotification,
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

  const handleSearchNotification = debounce((text: string) => {
    setNotificationQuery(text)
  })

  const handleOpenModalNotification = (data?: INotification) => {
    if (data) {
      setNotificationToUpdate(data)
      notificationFormRef.current?.setFieldValue('tag', data.tag)
      notificationFormRef.current?.setFieldValue('text', data.text)
      notificationFormRef.current?.setFieldValue('notificationType', data.notificationType)
    }
    setIsDrawerNotificationOpen(true)
  }

  const handleCloseModalNotification = () => {
    notificationFormRef.current?.reset()
    notificationFormRef.current?.setErrors({})
    setIsDrawerNotificationOpen(false)
    setNotificationToUpdate(undefined)
  }

  async function createNotificationRequest(data: IFormNotification) {
    setLoadingAction(true)
    createNotification
      .create({ ...data, isActive: false })
      .then(() => {
        router.push(appRoutes.ALERTS)
        toast.success('Notificação criada com sucesso!')
      })
      .catch(() => toast.error('Não foi possível criar a notificação!'))
      .finally(() => {
        setLoadingAction(false)
        handleCloseModalNotification()
        handleRefresher()
      })
  }

  async function updateNotificationRequest(data: IFormNotification) {
    setLoadingAction(true)
    updateNotification
      .update({ ...data, id: notificationToUpdate?.id, isActive: notificationToUpdate?.isActive })
      .then(() => {
        router.push(appRoutes.ALERTS)
        toast.success('Notificação atualizada com sucesso!')
      })
      .catch(() => toast.error('Não foi possível atualizar a notificação!'))
      .finally(() => {
        setLoadingAction(false)
        handleCloseModalNotification()
        handleRefresher()
        setNotificationToUpdate(undefined)
      })
  }

  async function handleFormSubmit(data: IFormNotification) {
    if (!notificationFormRef.current) throw new Error()
    try {
      notificationFormRef.current.setErrors({})
      const schema = Yup.object().shape({
        tag: Yup.string().required('Tag é necessária'),
        text: Yup.string().required('Texto é necessário'),
        notificationType: Yup.string().required('Tipo é necessário'),
      })

      await schema.validate(data, { abortEarly: false })
      notificationToUpdate ? updateNotificationRequest(data) : createNotificationRequest(data)
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
              Nova notificação
            </button>
          </div>
        </div>

        {notification.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
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
                      Ativo
                    </th>
                    <th className='text-dark min-w-100px text-start rounded-end'>Ação</th>
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
                        deleteNotification={deleteNotification}
                        handleRefresher={handleRefresher}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {notification.length == 0 && !loading && (
          <ItemNotFound message='Notificação não encontrada' />
        )}

        {loading && <Loading />}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div />

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
