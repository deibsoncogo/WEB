import '../styles/sass/style.scss'
import type { AppProps } from 'next/app'
import { LayoutProvider, LayoutSplashScreen, PageDataProvider } from '../layout/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <PageDataProvider>
        <Component {...pageProps} />
      </PageDataProvider>
    </LayoutProvider>
  )
}

export default MyApp
