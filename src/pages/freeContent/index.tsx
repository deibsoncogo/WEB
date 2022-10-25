import { NextPage } from "next"
import Head from "next/head"
import { MakeFreeContentTable } from "../../application/factories/components/freeContent/freeContentTable-factory"
import { AsideDefault } from "../../layout/components/aside/AsideDefault"
import { HeaderWrapper } from "../../layout/components/header/HeaderWrapper"

const FreeContent: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper title='Blog' />

          <div id='kt_content_container' className='container'>
           {MakeFreeContentTable()}
          </div>
        </div>
      </div>
    </>
  )
}

export default FreeContent