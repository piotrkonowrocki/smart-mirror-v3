import React from 'react'
import {NextPage} from 'next'
import Head from 'next/head'

import {siteName} from '@/app/dictionaries/site.dictionary'

const Home: NextPage = () => {
  const title = `${siteName} v${process.env.NEXT_PUBLIC_APP_VERSION}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Content
    </>
  )
}

export default Home
