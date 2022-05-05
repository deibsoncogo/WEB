import type { NextPage } from 'next'
import Head from 'next/head'

import { FormResetPassword } from '../layout/components/forms/reset-password'

const ResetPassword: NextPage = () => {
  return (
    <>
      <Head>
        <title>Redefinir Senha</title>
      </Head>

      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 h-100'>
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <div className='text-center mb-8'>
            <h1>Redefinição de Senha</h1>

            <p className='mt-8 mb-0 text-gray-600'>Insira sua nova senha</p>
          </div>

          <FormResetPassword />
        </div>
      </div>
    </>
  )
}

export default ResetPassword
