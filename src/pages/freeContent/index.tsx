import { NextPage } from "next"
import Head from "next/head"
import { AsideDefault } from "../../layout/components/aside/AsideDefault"
import { HeaderWrapper } from "../../layout/components/header/HeaderWrapper"

const FreeContent: NextPage = () => {
  return (
    <>
      <Head>
        <title>Conteúdos Gratuitos</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Conteúdos Gratuitos' />

          <div id='kt_content_container' className='container'>
           {/* {MakeRoomTable()} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default FreeContent