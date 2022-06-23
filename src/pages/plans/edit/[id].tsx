import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeEditPlanPageTemplate } from '../../../application/factories/pages/plans/edit-plan-factory'

import { AsideDefault } from '../../../layout/components/aside/AsideDefault'

import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const CreateTrainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Editar Plano</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Editar Plano' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakeEditPlanPageTemplate />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTrainings
