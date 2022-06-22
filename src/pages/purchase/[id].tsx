import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MakePurchaseView } from '../../application/factories/components/getPurchase-factory'
import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

const Purchase: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {}, [id])

  return (
    <>
      <Head>
        <title>Detalhes do pedido</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Detalhes do Pedido' />

          <div id='kt_content_container' className='container'>
            <div className=' bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakePurchaseView transactionId={id as string} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Purchase
