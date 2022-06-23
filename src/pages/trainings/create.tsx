import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeCreateTrainingPage } from '../../application/factories/pages/trainings/create-training-factory'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'

import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

const CreateTrainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Criar Treinamento</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Novo Treinamento' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakeCreateTrainingPage />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTrainings
