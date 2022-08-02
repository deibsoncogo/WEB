
import Head from "next/head"
import { MakeNotificationTable } from "../../application/factories/components/notification/notificationTable-factory"
import { MakeSalesTable } from "../../application/factories/components/sale/salesTable-factory"
import { AsideDefault } from "../../layout/components/aside/AsideDefault"
import { HeaderWrapper } from "../../layout/components/header/HeaderWrapper"

function Sales() {
  return (
    <>
      <Head>
        <title>Vendas</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Vendas' />

          <div id='kt_content_container' className='container'>        
           {MakeSalesTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sales