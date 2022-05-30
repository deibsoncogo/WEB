import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MakeFormUpdateUser } from '../../../application/factories/components/updateUser-factory'
import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const EditUser: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {}, [id])

  return (
    <>
      <Head>
        <title>Editar Usuário</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Editar Usuário' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakeFormUpdateUser id={id as string} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser
