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
  const { pagination, setTotalPage } = paginationHook
  const { take, currentPage} = pagination

  const [loading, setLoading] = useState(false)
  const [refresher, setRefresher] = useState(true)

  const [rooms, setRooms] = useState<IRoomPartialResponse[]>([])
  const [roomName, setRoomName] = useState('')
  

  const [column, setColumn] = useState('');
  const [order, setOrder] = useState<orderOptions>('')
  //const [orderedRooms, setOrderedRooms] = useState<Room[]>(rooms)


  useEffect(() => {

    const paginationParams: GetRoomParams = {name: roomName, page: currentPage, take, order: 'desc'}
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
  }, [refresher, pagination.take, pagination.currentPage, roomName])



  function handleRefresher() {    
    setRefresher(!refresher);
  }

  const handleOrdering = (column: string) => {
    setColumn(column);
    switch (order) {
      case '':        
        return setOrder('table-sort-asc')
      case 'table-sort-asc':
        return setOrder('table-sort-desc')
      default:
        setOrder('')
    }
  }
  
  const handleOrderColumn = (roomA: Room, roomB: Room) => {
    switch (column) {
      case 'name':
        return order === 'table-sort-asc' ? roomA.name.localeCompare(roomB.name, 'pt') : roomB.name.localeCompare(roomA.name, 'pt')
      case 'price':
        return order === 'table-sort-asc' ? roomA.price - roomB.price : roomB.price - roomA.price
      case 'teacher':
        return order === 'table-sort-asc' ? roomA.teacher.localeCompare(roomB.teacher, 'pt') : roomB.teacher.localeCompare(roomA.teacher, 'pt')
      case 'isActive':
        return order === 'table-sort-asc' ? Number(roomA.isActive) - Number(roomB.isActive) : Number(roomB.isActive) - Number(roomA.isActive)
      default:
        return 0
    }
  }

  /*
  useEffect(() => {  
    if (order === '') {
      setOrderedRooms(rooms)      
      return
    }
    
    setOrderedRooms((oldstate) => {
      const updatedOrderedRooms = oldstate.sort(handleOrderColumn)      
      return updatedOrderedRooms
    })    
  }, [order, rooms])
*/
  // const [searchText, setSearchText] = useState('')

  // const searchRoom = () => {
  //   const matchingRooms = rooms.filter(room => {      
  //     return room.name.match(new RegExp(searchText, "i")) || room.description.match(new RegExp(searchText, "i"))
  //   })
  //   setOrderedRooms(matchingRooms)
  // }

  
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
                <th className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer ${column === 'name' ? order : null}`} onClick={() => handleOrdering('name')}>Nome</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className={`text-dark min-w-100px cursor-pointer ${column === 'price' ? order : null}`} onClick={() => handleOrdering('price')}>Preço</th>
                <th className={`text-dark min-w-150px cursor-pointer ${column === 'teacher' ? order : null}`} onClick={() => handleOrdering('teacher')}>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className={`text-dark min-w-100px cursor-pointer ${column === 'isActive' ? order : null}`} onClick={() => handleOrdering('isActive')}>Ativo</th>
                <th className='text-dark min-w-50px text-end rounded-end' />
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
