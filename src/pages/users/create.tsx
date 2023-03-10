import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeFormCreateUser } from '../../application/factories/components/createUser-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

const Users: NextPage = () => {
  return (
    <>
      <Head>
        <title>Criar Usuário</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Novo Usuário' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              {MakeFormCreateUser()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Users
