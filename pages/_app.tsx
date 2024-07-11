import React from 'react'
import {Global} from '@emotion/react'
import settings from '@settings'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AppProps} from 'next/app'

import {SettingsProvider} from '@/app/context'
import {base, text} from '@/app/styles'

import '@/app/styles/vendors.scss'

const queryClient = new QueryClient()

const App = ({Component, pageProps}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider {...settings}>
        <Global styles={[base, text]} />
        <Component {...pageProps} />
      </SettingsProvider>
    </QueryClientProvider>
  )
}

export default App
