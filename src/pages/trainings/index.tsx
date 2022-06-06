import type { NextPage } from 'next'
import Head from 'next/head'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { MakeTrainingsPage } from '../../application/factories/pages/trainings/trainings-factory'

const Trainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Treinamentos</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Treinamentos' />

          <div id='kt_content_container' className='container'>
            <MakeTrainingsPage />
          </div>
        </div>
      </div>
    </>
  )
}

export default Trainings
