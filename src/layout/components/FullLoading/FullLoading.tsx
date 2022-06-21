import { Loading } from '../loading/loading'

const FullLoading = () => {
  return (
    <div
      className='align-items-center justify-content-center d-flex w-100 h-100 bg-light'
      style={{
        opacity: 0.6,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: '999',
      }}
    >
      <Loading />
    </div>
  )
}

export { FullLoading }
