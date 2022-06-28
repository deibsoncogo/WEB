import type { NextPage } from 'next'
import Head from 'next/head'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

import { MakeCourseTable } from '../../application/factories/components/course/courseTable-factory'

const Courses: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cursos</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Cursos' />

          <div id='kt_content_container' className='container'>
            <MakeCourseTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
