import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePagination } from '../../../../application/hooks/usePagination'
import { KTSVG } from '../../../../helpers'
import { Pagination } from '../../pagination/Pagination'
import { Search } from '../../search/Search'
import { Row } from './row'

import { toast } from 'react-toastify'
import { IDeleteRoom } from '../../../../domain/usecases/interfaces/room/deleteRoom'
import {
  GetRoomParams,
  IGetAllRooms,
} from '../../../../domain/usecases/interfaces/room/getAllRooms'
import { IToggleRoomStatus } from '../../../../domain/usecases/interfaces/room/toggleRoomStatus'
import { debounce } from '../../../../helpers/debounce'
import { IRoomPartialResponse } from '../../../../interfaces/api-response/roomPartialResponse'
import { currenceMask, maskedToMoney } from '../../../formatters/currenceFormatter'
import { Loading } from '../../loading/loading'
import { ItemNotFound } from '../../search/ItemNotFound'
import { IGetAllTeacherRooms } from '../../../../domain/usecases/interfaces/room/getAllTeacherRooms'
import { keys } from '../../../../helpers/KeyConstants'
import jwtDecode from 'jwt-decode'
import { IToken } from '../../../../interfaces/application/token'
import { roles } from '../../../../application/wrappers/authWrapper'

type Props = {
  getAllRooms: IGetAllRooms
  getAllTeacherRooms: IGetAllTeacherRooms
  toggleStatus: IToggleRoomStatus
  deleteRoom: IDeleteRoom
}

export function RoomsTable({
  getAllRooms,
  getAllTeacherRooms,
  toggleStatus,
  deleteRoom,
}: Props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [userId, setUserId] = useState('')
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [rooms, setRooms] = useState<IRoomPartialResponse[]>([])
  const [roomName, setRoomName] = useState('')

  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  async function getRooms(paginationParams: GetRoomParams) {
    try {
      if (!isAdmin && userId) {
        const { total, data } = await getAllTeacherRooms.getAll(paginationParams, userId)
        setRooms(data)
        setTotalPage(total)
      } else {
        const { total, data } = await getAllRooms.getAll(paginationParams)
        setRooms(data)
        setTotalPage(total)
      }

      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (err) {
      toast.error('Erro ao buscar treinamentos.')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(keys.TOKEN)
    if (token) {
      const values = jwtDecode<IToken>(token)
      setUserId(values.id)
      setIsAdmin(values.role === roles.ADMIN)
    }
  }, [])

  useEffect(() => {
    const paginationParams: GetRoomParams = {
      take: pagination.take,
      order: pagination.order,
      orderBy: pagination.orderBy,
      page: pagination.currentPage,
      name: roomName,
    }

    getRooms(paginationParams)
  }, [
    refresher,
    pagination.take,
    pagination.currentPage,
    pagination.order,
    roomName,
    isAdmin,
    userId,
  ])

  function handleRefresher() {
    setRefresher(!refresher)
  }

  const handleSearchRoom = debounce((text: string) => {
    setRoomName(text)
  })

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <Search onChangeText={handleSearchRoom} />
          </h3>
          {isAdmin && (
            <div className='card-toolbar'>
              <Link href='/rooms/create'>
                <a className='btn btn-sm btn-light-primary'>
                  <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
                  Nova Sala
                </a>
              </Link>
            </div>
          )}
        </div>

        {rooms.length > 0 && (
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bolder text-muted bg-light'>
                    <th
                      className={getColumnHeaderClasses('name')}
                      onClick={() => handleOrdenation('name')}
                    >
                      Nome
                    </th>
                    <th
                      className={getColumnHeaderClasses('description', 'min-w-150px')}
                      onClick={() => handleOrdenation('description')}
                    >
                      Descrição
                    </th>
                    <th
                      className={getColumnHeaderClasses('price')}
                      onClick={() => handleOrdenation('price')}
                    >
                      Preço
                    </th>
                    <th
                      className={getColumnHeaderClasses('teacher')}
                      onClick={() => handleOrdenation('teacher')}
                    >
                      Professor
                    </th>
                    <th className='text-dark min-w-50px'>Chat</th>
                    <th
                      className={getColumnHeaderClasses('isActive', 'min-w-80px')}
                      onClick={() => handleOrdenation('isActive')}
                    >
                      Ativo
                    </th>
                    <th className='text-dark min-w-80px text-start rounded-end'>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    rooms?.map((item) => (
                      <Row
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={maskedToMoney(item.price)}
                        teacher={item.teacherName}
                        isActive={item.isActive}
                        belongsToPlans={item.belongsToPlans}
                        toggleStatus={toggleStatus}
                        deleteRoom={deleteRoom}
                        isChatActive={item.isChatActive}
                        handleRefresher={handleRefresher}
                        isAdmin={isAdmin}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {rooms.length == 0 && !loading && <ItemNotFound message='Nenhuma sala encontrada' />}

        {loading && <Loading />}

        <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
          <div />

          <Pagination paginationHook={paginationHook} />
        </div>
      </div>
    </>
  )
}
