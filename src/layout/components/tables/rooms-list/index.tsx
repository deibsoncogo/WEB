import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Row } from './row'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import Pagination from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Room } from '../../../../interfaces/model/Room'
import { debounce } from '../../../../helpers/debounce'

type orderOptions = 'status-asc' | 'status-desc' | 'teacher-asc' | 'teacher-desc' | 'cheaper' | 'costlier' | 'table-sort-asc' | 'table-sort-desc' | ''

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

  const [order, setOrder] = useState<orderOptions>('')
  const [orderedRooms, setOrderedRooms] = useState<Room[]>(rooms)

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

  const handleOrderRoomByName = () => {
    console.log(order)
    switch (order) {
      case '':
        return setOrder('table-sort-asc')
      case 'table-sort-asc':
        return setOrder('table-sort-desc')
      default:
        setOrder('')
    }
  }

  const orderRoomByNameASC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.name.charCodeAt(0)
    const secondCharValue = roomB.name.charCodeAt(0)
    return firtstCharValue - secondCharValue
  }

  const orderRoomByNameDESC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.name.charCodeAt(0)
    const secondCharValue = roomB.name.charCodeAt(0)
    return secondCharValue - firtstCharValue
  }

  const handleOrderRoomByPrice = () => {
    console.log(order)
    switch (order) {
      case '':
        return setOrder('cheaper')
      case 'cheaper':
        return setOrder('costlier')
      default:
        setOrder('')
    }
  }

  const orderRoomByPriceASC = (roomA: Room, roomB: Room) => {
    return roomA.price - roomB.price
  }

  const orderRoomByPriceDESC = (roomA: Room, roomB: Room) => {
    return roomB.price - roomA.price
  }

  const handleOrderRoomByTeacher = () => {
    console.log(order)
    switch (order) {
      case '':
        return setOrder('teacher-asc')
      case 'teacher-asc':
        return setOrder('teacher-desc')
      default:
        setOrder('')
    }
  }

  const orderRoomByTeacherASC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.teacher.charCodeAt(0)
    const secondCharValue = roomB.teacher.charCodeAt(0)
    return firtstCharValue - secondCharValue
  }

  const orderRoomByTeacherDESC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.teacher.charCodeAt(0)
    const secondCharValue = roomB.teacher.charCodeAt(0)
    return secondCharValue - firtstCharValue
  }

  const handleOrderRoomByStatus = () => {
    console.log(order)
    switch (order) {
      case '':
        return setOrder('status-asc')
      case 'status-asc':
        return setOrder('status-desc')
      default:
        setOrder('')
    }
  }

  const orderRoomByStatusASC = (roomA: Room, roomB: Room) => {
    return roomA.isActive - roomB.isActive
  }

  const orderRoomByStatusDESC = (roomA: Room, roomB: Room) => {
    return roomB.isActive - roomA.isActive
  }

  useEffect(() => {
    if (order === 'table-sort-asc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByNameASC)
        return updatedOrderedRooms
      })
    }

    if (order === 'table-sort-desc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByNameDESC)
        return updatedOrderedRooms
      })
    }

    if (order === 'cheaper') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByPriceASC)
        return updatedOrderedRooms
      })
    }

    if (order === 'costlier') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByPriceDESC)
        return updatedOrderedRooms
      })
    }

    if (order === 'teacher-asc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByTeacherASC)
        return updatedOrderedRooms
      })
    }

    if (order === 'teacher-desc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByTeacherDESC)
        return updatedOrderedRooms
      })
    }

    if (order === 'status-asc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByStatusASC)
        return updatedOrderedRooms
      })
    }

    if (order === 'status-desc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomByStatusDESC)
        return updatedOrderedRooms
      })
    }

    if (order === '') {
      setOrderedRooms(rooms)
    }
  }, [order, rooms])

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
                <th className='text-dark ps-4 min-w-100px rounded-start' onClick={handleOrderRoomByName}>Nome</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className='text-dark min-w-100px' onClick={handleOrderRoomByPrice}>Preço</th>
                <th className='text-dark min-w-150px' onClick={handleOrderRoomByTeacher}>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className='text-dark min-w-100px' onClick={handleOrderRoomByStatus}>Ativo</th>
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
