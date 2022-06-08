import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Row } from './row'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import { Pagination } from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Room } from '../../../../interfaces/model/Room'
import { debounce } from '../../../../helpers/debounce'

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

export function RoomsTable() {
  const paginationHook = usePagination()

  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Boletim Diário',
      description: 'Boletim completo s...',
      price: 49.80,
      teacher: 'Palex',
      isActive: true,
    },
    {
      id: '2',
      name: 'Planilhas',
      description: 'Planilha completas...',
      price: 84.00,
      teacher: 'Palex',
      isActive: false,
    },
  ])

  const [column, setColumn] = useState('');
  const [order, setOrder] = useState<orderOptions>('')
  const [orderedRooms, setOrderedRooms] = useState<Room[]>(rooms)

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
        return order === 'table-sort-asc' ? roomA.name.charCodeAt(0) - roomB.name.charCodeAt(0) : roomB.name.charCodeAt(0) - roomA.name.charCodeAt(0)
      case 'price':
        return order === 'table-sort-asc' ? roomA.price - roomB.price : roomB.price - roomA.price
      case 'teacher':
        return order === 'table-sort-asc' ? roomA.teacher.charCodeAt(0) - roomB.teacher.charCodeAt(0) : roomB.teacher.charCodeAt(0) - roomA.teacher.charCodeAt(0)
      case 'isActive':
        return order === 'table-sort-asc' ? 0 : 1
      default:
        return 0
    }
  }

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

  const [searchText, setSearchText] = useState('')

  const searchRoom = () => {
    const matchingRooms = rooms.filter(room => {      
      return room.name.match(new RegExp(searchText, "i")) || room.description.match(new RegExp(searchText, "i"))
    })
    setOrderedRooms(matchingRooms)
  }

  useEffect(() => {
    searchRoom();
  }, [searchText]);

  const handleSearchRoom = debounce((text: string) => {
    setSearchText(text)
  })

  return (
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

      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-striped align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className={`text-dark ps-4 min-w-100px rounded-start cursor-pointer ${column === 'name' ? order : null}`} onClick={() => handleOrdering('name')}>Nome</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className={`text-dark min-w-100px cursor-pointer ${column === 'price' ? order : null}`} onClick={() => handleOrdering('price')}>Preço</th>
                <th className={`text-dark min-w-150px cursor-pointer ${column === 'teacher' ? order : null}`} onClick={() => handleOrdering('teacher')}>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className={`text-dark min-w-100px cursor-pointer ${column === 'isActive' ? order : null}`} onClick={() => handleOrdering('isActive')}>Ativo</th>
                <th className='text-dark min-w-50px'>Ação</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                orderedRooms?.map((item) => (
                  <Row
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    teacher={item.teacher}
                    isActive={item.isActive}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='card d-flex flex-row justify-content-between align-items-center ps-9 pe-9 pb-5'>
        <div />        

        <Pagination paginationHook={paginationHook} />
      </div>
    </div>
  )
}
