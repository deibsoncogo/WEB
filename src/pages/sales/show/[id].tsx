import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MakePageSaleInfo } from '../../../application/factories/components/sale/saleInfo-factory'
import { AsideDefault } from '../../../layout/components/aside/AsideDefault'
import { HeaderWrapper } from '../../../layout/components/header/HeaderWrapper'

const ShowSale: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Detalhes do Pedido</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid'>
          <HeaderWrapper title='Detalhes do Pedido' />

          <div className='container'>
            <div className='bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <MakePageSaleInfo id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowSale
