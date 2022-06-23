import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeRoomTable } from '../../application/factories/components/room/roomTable-factory'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { RoomsTable } from '../../layout/components/tables/rooms-list'

const Rooms: NextPage = () => {
  return (
    <>
      <Head>
        <title>Salas</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Salas' />

          <div id='kt_content_container' className='container'>
           {MakeRoomTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Rooms