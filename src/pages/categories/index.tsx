import Head from 'next/head'
import React from 'react'
import { MakeCategoriesTable } from '../../application/factories/components/categoriesTable-factory'
import { MakeUserTable } from '../../application/factories/components/userTable-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

function Categories() {
  return (
    <>
      <Head>
        <title>Categorias</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Usuários' />

          <div id='kt_content_container' className='container'>
            {MakeCategoriesTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
