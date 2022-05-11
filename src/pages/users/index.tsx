import type { NextPage } from 'next'
import Head from 'next/head'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { UsersTable } from '../../layout/components/tables/users-list'

const Users: NextPage = () => {
  return (
    <>
      <Head>
        <title>Usuários</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Usuários' />

          <div id='kt_content_container' className='container'>
            <UsersTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Users
