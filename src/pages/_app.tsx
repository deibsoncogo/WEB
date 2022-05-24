import '../styles/sass/style.scss'
import type { AppProps } from 'next/app'
import { LayoutProvider, PageDataProvider } from '../layout/core'
import { useRouter } from 'next/router'
import { unprotectedRoutes } from '../application/routing/routes'
import { AuthWrapper } from '../application/wrappers/authWrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter()
  const currentPath = route.pathname ? route.pathname : '/'

  return (
    <LayoutProvider>
      <PageDataProvider>
        {unprotectedRoutes.includes(currentPath) ? (
          <Component {...pageProps} />
        ) : (
          <AuthWrapper>
            <Component {...pageProps} />{' '}
          </AuthWrapper>
        )}
      </PageDataProvider>
      <ToastContainer theme='colored' />
    </LayoutProvider>
  )
}

export default MyApp
