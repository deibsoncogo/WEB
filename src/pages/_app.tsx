import '../styles/sass/style.scss'
import '../styles/sass/general.scss'
import type { AppProps } from 'next/app'
import { LayoutProvider, LayoutSplashScreen, PageDataProvider } from '../layout/core'

import Modal from 'react-modal'
import { Suspense } from 'react'
Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <PageDataProvider>
          <Component {...pageProps} />
        </PageDataProvider>
      </LayoutProvider>
    </Suspense>
  )
}

export default MyApp
