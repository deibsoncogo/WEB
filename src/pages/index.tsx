import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { FormLogin } from '../layout/components/forms/login'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 h-100'>
        <div className='mb-10'>
          <Image
            src='/images/ativocor logo new .png'
            alt='At Palex'
            width={196.15}
            height={77.6}
            objectFit='contain'
          />
        </div>

        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <div className='text-center mb-15'>
            <h1>LOGIN</h1>
          </div>
          <FormLogin />
        </div>
      </div>
    </>
  )
}

export default Home
