import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeFormCreateFreeContent } from '../../application/factories/components/freeContent/createFreeContent-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'


const CreateFreeContent: NextPage = () => {
  return (
    <>
      <Head>
        <title>Criar Conteúdo Gratuito</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Novo Conteúdo Gratuito' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              {MakeFormCreateFreeContent()}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateFreeContent
