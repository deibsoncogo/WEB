import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { CssBaseline } from '@nextui-org/react';

export default class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [<>{initialProps.styles}</>]
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap'
            rel='stylesheet'
          />

          <link rel='shortcut icon' href='/favicon.png' type='image/png' />
          {CssBaseline.flush()}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
