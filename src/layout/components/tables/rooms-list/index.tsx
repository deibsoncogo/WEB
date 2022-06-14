import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Row } from './row'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { Pagination } from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Room } from '../../../../interfaces/model/Room'
import { debounce } from '../../../../helpers/debounce'
import { IDeleteRoom } from '../../../../domain/usecases/interfaces/room/deleteRoom'
import { currenceMask } from '../../../formatters/currenceFormatter'
import { IGetRoom } from '../../../../domain/usecases/interfaces/room/getCourse'
import { IUpdateRoom } from '../../../../domain/usecases/interfaces/room/updateRoom'
import { GetRoomParams, IGetAllRooms } from '../../../../domain/usecases/interfaces/room/getAllRooms'
import { toast } from 'react-toastify'
import { IRoomPartialResponse } from '../../../../interfaces/api-response/roomPartialResponse'
import { Loading } from '../../loading/loading'
import { ItemNotFound } from '../../search/ItemNotFound'

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

type Props =  { 
  getAllRooms: IGetAllRooms 
  getRoom: IGetRoom
  updateRoom: IUpdateRoom
  deleteRoom: IDeleteRoom 
}


export function RoomsTable({getAllRooms, getRoom, updateRoom, deleteRoom}: Props) {
  const paginationHook = usePagination()
  const { pagination, setTotalPage, handleOrdenation, getClassToCurrentOrderColumn } =
    paginationHook

 
  const [loading, setLoading] = useState(true)
  const [refresher, setRefresher] = useState(true)

  const [rooms, setRooms] = useState<IRoomPartialResponse[]>([])
  const [roomName, setRoomName] = useState('')
  

  const [column, setColumn] = useState('');
  const [order, setOrder] = useState<orderOptions>('')


  const getColumnHeaderClasses = (name: string, minWidth = 'min-w-100px') => {
    return `text-dark ps-4 ${minWidth} rounded-start cursor-pointer ${getClassToCurrentOrderColumn(
      name
    )}`
  }

  useEffect(() => {

    const paginationParams: GetRoomParams = {
      take: pagination.take,
      order: pagination.order,
      orderBy: pagination.orderBy,
      page: pagination.currentPage,
      name: roomName,
    } 
       getAllRooms.getAll(paginationParams)
      .then((data) => {           
       setRooms(data.data)
       setTotalPage(data.total)
      })
      .catch(() => toast.error("Não foi possível listar as salas."))
      .finally(() => 
       setTimeout(() => {
        setLoading(false)
       }, 500)
       
      )
  }, [refresher, pagination.take, pagination.currentPage, pagination.order, roomName])



  function handleRefresher() {    
    setRefresher(!refresher);
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
        <div className='card-toolbar'>
          <Link href='/rooms/create'>
            <a className='btn btn-sm btn-light-primary'>
              <KTSVG path='/icons/arr075.svg' className='svg-icon-2' />
              Nova Sala
            </a>
          </Link>
        </div>
      </div>

      {rooms.length > 0 && (<div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
              <th className={getColumnHeaderClasses('name')}
                    onClick={() => handleOrdenation('name')}
                    >Nome</th>
                <th className={getColumnHeaderClasses('description', 'min-w-150px')}
                     onClick={() => handleOrdenation('description')}>Descrição</th>
                <th className={getColumnHeaderClasses('price')}
                     onClick={() => handleOrdenation('price')}>Preço</th>
                <th className={getColumnHeaderClasses('teacher')}
                     onClick={() => handleOrdenation('teacher')}>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className={getColumnHeaderClasses('isActive', 'min-w-110px')}
                     onClick={() => handleOrdenation('isActive')}>Ativo</th>
                <th className='text-dark min-w-50px text-center rounded-end'>Ação</th>
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
                    price={currenceMask(item.price+'')}
                    teacher={item.teacherName}
                    isActive={item.isActive}
                    getRoom={getRoom}
                    updateRoom={updateRoom}
                    deleteRoom={deleteRoom}
                    handleRefresher={handleRefresher}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>)}

       {rooms.length == 0 && !loading && <ItemNotFound message = 'Nenhuma sala encontrada'/>}

       {loading && <Loading/>}

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div />        

        <Pagination paginationHook={paginationHook} />
      </div>
    </div>

    </>
  )
}
