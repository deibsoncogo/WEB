import type { NextPage } from 'next'
import Head from 'next/head'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { MakeUserTable } from '../../application/factories/components/userTable-factory'

const Users: NextPage = () => {
  return (
    <>
      <Head>
        <title>Livros</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Livros' />

          <div id='kt_content_container' className='container'>
            {MakeUserTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Users
