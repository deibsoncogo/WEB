import type { NextPage } from 'next'
import Head from 'next/head'

import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { FormEditTrainings } from '../../../layout/components/forms/trainings/edit'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const EditTrainings: NextPage = () => {
  const fakeData: ITrainings = {
    id: 'string',
    name: 'string',
    teacher: { id: '123', name: 'teacher' },
    description: 'string',
    //categories: 'string',
    price: 20,
    discount: 10,
    //chatTime: new Date('02/02/2000'),
    //finishDate: new Date('02/02/2000'),
    //liveDate: new Date('02/02/2000'),
    //time: new Date('02/02/2000'),
    categoryId: '123',
    imageUrl: '123',
    isChatActive: true,
    streamingDate: new Date('02/02/2000').toDateString(),
    streamingHour: new Date('02/02/2000').toTimeString(),
  }

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
              <FormEditTrainings data={fakeData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditTrainings
