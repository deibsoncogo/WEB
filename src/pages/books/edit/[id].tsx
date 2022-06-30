import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MakeEditBook } from '../../../application/factories/pages/books/edit-book-factory'
import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const EditBook: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {}, [id])

  return (
    <>
      <Head>
        <title>Editar Livro</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Editar Livro' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakeEditBook />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBook
