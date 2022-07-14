import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MakeFormUpdateFreeContent } from '../../../application/factories/components/freeContent/editFreeContent-factory'
import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const EditFreeContent: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Editar Conteúdo Gratuito</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Editar Conteúdo Gratuito' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              {<MakeFormUpdateFreeContent id={id as string} />}            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditFreeContent
