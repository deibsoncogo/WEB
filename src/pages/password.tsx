import type { NextPage } from 'next'
import Head from 'next/head'

import { FormForgotPassword } from '../layout/components/forms/forgot-password'

const Password: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recuperar Senha</title>
      </Head>

      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 h-100'>
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <div className='text-center mb-8'>
            <h1>Recuperação de Senha</h1>

            <p className='mt-8 mb-0 text-gray-600'>
              Insira seu e-mail cadastrado para receber um link de redefinição de senha
            </p>
          </div>

          <FormForgotPassword />
        </div>
      </div>
    </>
  )
}

export default Password
