import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeEditTraining } from '../../../application/factories/pages/trainings/edit-training-factory'
import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const EditTrainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Editar Treinamento</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Editar Treinamento' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakeEditTraining />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditTrainings