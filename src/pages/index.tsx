import type { NextPage } from 'next'
import Head from 'next/head'
import { MakeFormSignInUser } from '../application/factories/components/signInUser-factory'
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 h-100'>
        <div className='mb-10'>
          <img
            src='/images/ativocor_logo_new.png'
            alt='At Palex'
            width={196.15}
            height={77.6}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <div className='text-center mb-15'>
            <h1>LOGIN</h1>
          </div>
          <MakeFormSignInUser />
        </div>
      </div>
    </>
  )
}

export default Home
