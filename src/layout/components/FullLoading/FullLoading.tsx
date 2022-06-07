import { Loading } from '../loading/loading'

const FullLoading = () => {
  return (
    <div
      className='align-items-center justify-content-center d-flex w-100 h-100 position-absolute bg-light'
      style={{
        opacity: 0.5,
      }}
    >
      <Loading />
    </div>
  )
}

export { FullLoading }
