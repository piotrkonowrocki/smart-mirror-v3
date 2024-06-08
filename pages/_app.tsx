import React from 'react'
import {Global} from '@emotion/react'
import {AppProps} from 'next/app'

import {base, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Global styles={[base, text]} />
      <Component {...pageProps} />
    </>
  )
}

export default App
