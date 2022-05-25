import type { NextPage } from 'next'
import Head from 'next/head'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { TrainingsTable } from '../../layout/components/tables/trainings-list'

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
            <TrainingsTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Trainings
