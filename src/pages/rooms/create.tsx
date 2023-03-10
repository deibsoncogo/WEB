import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeFormCreateRoom } from '../../application/factories/components/room/createRoom-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'


const CreateRoom: NextPage = () => {
  return (
    <>
      <Head>
        <title>Criar Sala</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Nova Sala' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              {MakeFormCreateRoom()}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateRoom
