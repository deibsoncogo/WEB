import { NextPage } from 'next'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <>
      <div className='d-flex align-items-center justify-content-center vh-100'>
        <div className='text-center'>
          <h1 className='display-1 fw-bold'>401</h1>
          <p className='fs-3'>
            {' '}
            <span className='text-danger'>Ops! 😞</span> Página restrita.
          </p>
          <p className='lead'>Entre em contato com o administrador para mais informações.</p>

          <Link href='/dashboard'>
            <a className='btn btn-primary'>Página Inicial</a>
          </Link>
        </div>
      </div>
    </>
  )
}
