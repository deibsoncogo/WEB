import Link from 'next/link'

export default function Error404() {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>404</h1>
        <p className='fs-3'>
          {' '}
          <span className='text-danger'>Opps! 😅</span> Página não encontrada.
        </p>

        <Link href='/dashboard'>
          <a className='btn btn-primary'>Página Inicial</a>
        </Link>
      </div>
    </div>
  )
}
