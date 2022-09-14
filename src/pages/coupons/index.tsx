import { NextPage } from 'next'
import Head from 'next/head'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'
import { MakeCouponsPage } from '../../application/factories/pages/coupons/coupons-factory'

const Coupons: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cupons de Desconto</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Cupons de desconto' />

          <div id='kt_content_container' className='container'>
            <MakeCouponsPage />
          </div>
        </div>
      </div>
    </>
  )
}

export default Coupons
