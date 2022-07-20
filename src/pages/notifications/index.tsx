
import Head from "next/head"
import { MakeNotificationTable } from "../../application/factories/components/notification/notificationTable-factory"
import { AsideDefault } from "../../layout/components/aside/AsideDefault"
import { HeaderWrapper } from "../../layout/components/header/HeaderWrapper"

function Notification() {
  return (
    <>
      <Head>
        <title>Notificações</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Notificações' />

          <div id='kt_content_container' className='container'>
           {MakeNotificationTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification