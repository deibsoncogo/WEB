import type { NextPage } from 'next'
import Head from 'next/head'

import { AsideDefault } from '../../layout/components/aside/AsideDefault'
import { ChatInner } from '../../layout/components/chat/trainings'
import { HeaderWrapper } from '../../layout/components/header/HeaderWrapper'

const ChatTrainings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>

      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />

        <div id='kt_wrapper' className='wrapper d-flex flex-column flex-row-fluid'>
          <HeaderWrapper title='Chat' />

          <div id='kt_content_container' className='container'>
            <div className='bg-white rounded shadow-sm pb-0 border border-gray-600 overflow-hidden position-relative'>
              <div className='border-bottom border-gray-600 p-3 ps-5'>
                <h1>Treinamento</h1>
              </div>

              <ChatInner />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatTrainings
