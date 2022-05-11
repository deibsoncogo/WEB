import type { NextPage } from 'next'
import Head from 'next/head'
import { AsideDefault } from '../layout/components/aside/AsideDefault'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'></div>
      </div>
    </>
  )
}

export default Dashboard
