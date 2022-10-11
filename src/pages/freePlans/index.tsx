import Head from 'next/head'
import { MakeListFreePlansPage } from '../../application/factories/pages/freePlans/freePlans-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

function FreePlans() {
  return (
    <>
      <Head>
        <title>Planos Gratuitos</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Planos Gratuitos' />

          <div id='kt_content_container' className='container'>
            <MakeListFreePlansPage />
          </div>
        </div>
      </div>
    </>
  )
}

export default FreePlans
