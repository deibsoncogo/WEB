import type { NextPage } from 'next'
import { AsideDefault } from '../layout/components/aside/AsideDefault'
import { PageDataProvider } from '../layout/core'

const Dashboard: NextPage = () => {
  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'></div>
      </div>
    </PageDataProvider>
  )
}

export default Dashboard
