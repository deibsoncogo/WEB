import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeFormCreateCourse } from '../../application/factories/components/course/createCourse-factory'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { FormCreateCourse } from '../../layout/components/forms/course/create'
import { FormCreateTrainings } from '../../layout/components/forms/trainings/create'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

const CreateCourse: NextPage = () => {
  return (
    <>
      <Head>
        <title>Criar Curso</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Novo Curso' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              { MakeFormCreateCourse()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCourse
