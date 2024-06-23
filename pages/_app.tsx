import React from 'react'
import {Global} from '@emotion/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AppProps} from 'next/app'

import {base, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const queryClient = new QueryClient()

const App = ({Component, pageProps}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={[base, text]} />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
