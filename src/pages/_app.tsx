import '../styles/sass/style.scss'
import '../styles/sass/general.scss'
import type { AppProps } from 'next/app'
import { LayoutProvider, LayoutSplashScreen, PageDataProvider } from '../layout/core'
import { useRouter } from 'next/router'
import { publicRoutes } from '../application/routing/routes'
import { AuthWrapper } from '../application/wrappers/authWrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import { Suspense } from 'react'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter()
  const currentPath = route.pathname ? route.pathname : '/'

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <PageDataProvider>
          <ToastContainer theme='light' autoClose={2000} />

          {publicRoutes.includes(currentPath) ? (
            <Component {...pageProps} />
          ) : (        
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>        
          )}
        </PageDataProvider>
      </LayoutProvider>
    </Suspense>
  )
}

export default MyApp
