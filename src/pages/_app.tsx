import '../styles/sass/style.scss'
import type { AppProps } from 'next/app'
import { LayoutProvider, LayoutSplashScreen } from '../layout/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  )
}

export default MyApp
