import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Row } from './row'
import { KTSVG } from '../../../../helpers'
import { Search } from '../../search/Search'
import Pagination from '../../pagination/Pagination'
import { usePagination } from '../../../../application/hooks/usePagination'
import { Room } from '../../../../interfaces/model/Room'

type orderOptions = 'table-sort-asc' | 'table-sort-desc' | ''

export function RoomsTable() {
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const paginationHook = usePagination()

  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Boletim Diário',
      description: 'Boletim completo s...',
      price: '49,80',
      teacher: 'Palex',
      isActive: true,
    },
    {
      id: '2',
      name: 'Planilhas',
      description: 'Planilha completas...',
      price: '84,00',
      teacher: 'Palex',
      isActive: false,
    },
  ])

  const [order, setOrder] = useState<orderOptions>('')
  const [orderedRooms, setOrderedRooms] = useState<Room[]>(rooms)

  const handleOrderRoom = () => {
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

  const orderRoomASC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.name.charCodeAt(0)
    const secondCharValue = roomB.name.charCodeAt(0)
    return firtstCharValue - secondCharValue
  }

  const orderRoomDESC = (roomA: Room, roomB: Room) => {
    const firtstCharValue = roomA.name.charCodeAt(0)
    const secondCharValue = roomB.name.charCodeAt(0)
    return secondCharValue - firtstCharValue
  }

  useEffect(() => {
    if (order === 'table-sort-asc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomASC)
        return updatedOrderedRooms
      })
    }

    if (order == 'table-sort-desc') {
      setOrderedRooms((oldstate) => {
        const updatedOrderedRooms = oldstate.sort(orderRoomDESC)
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
          <Search onChangeText={() => null} />
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
                <th className='text-dark ps-4 min-w-100px rounded-start' onClick={handleOrderRoom}>Nome</th>
                <th className='text-dark min-w-100px'>Descrição</th>
                <th className='text-dark min-w-100px'>Preço</th>
                <th className='text-dark min-w-150px'>Professor</th>
                <th className='text-dark min-w-100px'>Chat</th>
                <th className='text-dark min-w-100px'>Ativo</th>
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
